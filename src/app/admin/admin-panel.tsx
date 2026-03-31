"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  saveAdminSettingsAction,
  type SaveAdminState,
} from "./actions";
import type { SettingsPayload } from "@/lib/settings-types";
import type { InferSelectModel } from "drizzle-orm";
import type { appLogs } from "@/db/schema";

type LogRow = InferSelectModel<typeof appLogs>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-[var(--bg)] disabled:opacity-50"
    >
      {pending ? "Saving…" : "Save settings"}
    </button>
  );
}

export function AdminPanel(props: {
  settings: SettingsPayload;
  logs: LogRow[];
  envStatus: {
    hasOpenAi: boolean;
    hasSlackSigning: boolean;
    hasSlackBot: boolean;
    hasAdoPat: boolean;
    envAdoOrg: boolean;
    envAdoProject: boolean;
    hasBasicAuth: boolean;
    hasDatabaseUrl: boolean;
  };
  slackApiUrl: string;
}) {
  const { settings, logs, envStatus, slackApiUrl } = props;
  const [saveState, formAction] = useActionState<
    SaveAdminState,
    FormData
  >(saveAdminSettingsAction, null);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-[var(--muted)]">
            This page is protected with{" "}
            <strong className="font-medium text-[var(--text)]">HTTP Basic Auth</strong>{" "}
            (browser prompt). Preferences live in Postgres; API keys stay in
            environment variables.
          </p>
        </div>
      </div>

      <section className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-medium">Secrets (environment)</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <li>
            DATABASE_URL (Neon / Vercel Storage):{" "}
            <Status ok={envStatus.hasDatabaseUrl} />
          </li>
          <li>
            OpenAI API key:{" "}
            <Status ok={envStatus.hasOpenAi} />
          </li>
          <li>
            Slack signing secret:{" "}
            <Status ok={envStatus.hasSlackSigning} />
          </li>
          <li>
            Slack bot token: <Status ok={envStatus.hasSlackBot} />
          </li>
          <li>
            Azure DevOps PAT: <Status ok={envStatus.hasAdoPat} />
          </li>
          <li>
            Env ADO org: <Status ok={envStatus.envAdoOrg} />
          </li>
          <li>
            Env ADO project: <Status ok={envStatus.envAdoProject} />
          </li>
          <li>
            Admin Basic Auth: <Status ok={envStatus.hasBasicAuth} />
          </li>
        </ul>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Slack interactions URL:{" "}
          <code className="break-all text-[var(--accent)]">{slackApiUrl}</code>
        </p>
      </section>

      <form action={formAction} className="mt-10 space-y-8">
        {saveState?.ok === false ? (
          <p className="rounded-md border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
            {saveState.error}
          </p>
        ) : null}
        {saveState?.ok === true ? (
          <p className="rounded-md border border-[var(--ok)]/40 bg-[var(--ok)]/10 px-3 py-2 text-sm text-[var(--ok)]">
            Settings saved.
          </p>
        ) : null}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-lg font-medium">Azure DevOps</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Overrides optional if <code>AZURE_DEVOPS_ORG</code> /{" "}
            <code>AZURE_DEVOPS_PROJECT</code> are set in the environment.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[var(--muted)]">Organization</span>
              <input
                name="adoOrg"
                defaultValue={settings.adoOrg ?? ""}
                placeholder="e.g. contoso"
                className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[var(--muted)]">Project</span>
              <input
                name="adoProject"
                defaultValue={settings.adoProject ?? ""}
                className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-lg font-medium">OpenAI</h2>
          <label className="mt-4 flex flex-col gap-1 text-sm">
            <span className="text-[var(--muted)]">Model</span>
            <input
              name="openaiModel"
              defaultValue={settings.openaiModel}
              className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </label>
        </section>

        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-lg font-medium">QA pool & assignment</h2>
          <label className="mt-4 flex flex-col gap-1 text-sm">
            <span className="text-[var(--muted)]">
              QA emails (one per line, Azure DevOps identities)
            </span>
            <textarea
              name="qaPoolText"
              rows={5}
              defaultValue={settings.qaEmails.join("\n")}
              placeholder="qa1@company.com&#10;qa2@company.com"
              className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </label>
          <label className="mt-4 flex flex-col gap-1 text-sm">
            <span className="text-[var(--muted)]">Assignment mode</span>
            <select
              name="assignmentMode"
              defaultValue={settings.assignmentMode}
              className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--accent)]"
            >
              <option value="round_robin">Round robin (default)</option>
              <option value="random">Random</option>
            </select>
          </label>
        </section>

        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-lg font-medium">Automation</h2>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="automationEnabled"
              value="on"
              defaultChecked={settings.automationEnabled}
              className="h-4 w-4 rounded border-[var(--border)]"
            />
            <span>Enable automation (shortcuts create bugs when confidence is high enough)</span>
          </label>
          <label className="mt-4 flex flex-col gap-1 text-sm">
            <span className="text-[var(--muted)]">
              Minimum confidence (0–1) to create a work item
            </span>
            <input
              type="number"
              name="confidenceThreshold"
              min={0}
              max={1}
              step={0.01}
              defaultValue={settings.confidenceThreshold}
              className="max-w-xs rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </label>
        </section>

        <SubmitButton />
      </form>

      <section className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-medium">Recent logs</h2>
        <div className="mt-4 max-h-96 overflow-auto text-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="py-2 pr-4 font-medium">Time</th>
                <th className="py-2 pr-4 font-medium">Level</th>
                <th className="py-2 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-[var(--muted)]">
                    No log entries yet.
                  </td>
                </tr>
              ) : (
                logs.map((row) => (
                  <tr key={row.id} className="border-b border-[var(--border)]/60 align-top">
                    <td className="py-2 pr-4 whitespace-nowrap text-[var(--muted)]">
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="py-2 pr-4">{row.level}</td>
                    <td className="py-2">
                      {row.message}
                      {row.meta ? (
                        <pre className="mt-1 max-w-full overflow-x-auto text-xs text-[var(--muted)]">
                          {JSON.stringify(row.meta, null, 2)}
                        </pre>
                      ) : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Status({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-[var(--ok)]">set</span>
  ) : (
    <span className="text-[var(--danger)]">missing</span>
  );
}
