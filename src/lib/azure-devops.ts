function basicAuth(pat: string) {
  return Buffer.from(`:${pat}`, "utf8").toString("base64");
}

function severityToAdo(
  s: "low" | "medium" | "high" | "critical",
): string {
  const map = {
    critical: "1 - Critical",
    high: "2 - High",
    medium: "3 - Medium",
    low: "4 - Low",
  } as const;
  return map[s];
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildBugDescriptionHtml(params: {
  description: string;
  reproSteps: string[];
  notes?: string;
}): string {
  const parts: string[] = [`<p>${escapeHtml(params.description).replaceAll("\n", "<br/>")}</p>`];
  if (params.reproSteps.length) {
    parts.push("<p><b>Repro steps</b></p><ol>");
    for (const step of params.reproSteps) {
      parts.push(`<li>${escapeHtml(step)}</li>`);
    }
    parts.push("</ol>");
  }
  if (params.notes) {
    parts.push(`<p><i>${escapeHtml(params.notes)}</i></p>`);
  }
  return parts.join("");
}

export async function createAzureBug(params: {
  org: string;
  project: string;
  pat: string;
  workItemType?: string;
  title: string;
  descriptionHtml: string;
  severity: "low" | "medium" | "high" | "critical";
  assigneeEmail?: string;
}): Promise<{ id: number; url: string }> {
  const type = params.workItemType ?? "Bug";
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/$${encodeURIComponent(type)}?api-version=7.1`;

  const patch: Array<Record<string, string | unknown>> = [
    { op: "add", path: "/fields/System.Title", value: params.title },
    { op: "add", path: "/fields/System.Description", value: params.descriptionHtml },
    {
      op: "add",
      path: "/fields/Microsoft.VSTS.Common.Severity",
      value: severityToAdo(params.severity),
    },
  ];
  if (params.assigneeEmail) {
    patch.push({
      op: "add",
      path: "/fields/System.AssignedTo",
      value: params.assigneeEmail,
    });
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json-patch+json",
      Authorization: `Basic ${basicAuth(params.pat)}`,
    },
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure DevOps create failed ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as { id: number };
  const workUrl = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_workitems/edit/${data.id}`;
  return { id: data.id, url: workUrl };
}

export async function addWorkItemComment(params: {
  org: string;
  project: string;
  pat: string;
  workItemId: number;
  text: string;
}): Promise<void> {
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/${params.workItemId}/comments?api-version=7.1-preview.3`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth(params.pat)}`,
    },
    body: JSON.stringify({ text: params.text }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure DevOps comment failed ${res.status}: ${errText}`);
  }
}
