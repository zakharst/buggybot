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

/** Shown at the top of /admin so Slack→ADO/media issues are visible without scrolling. */
const PIPELINE_LOG_MESSAGE_RE =
  /slack|openai|azure|(^|[^a-z])ado([^a-z]|$)|attachment|media|files\.|conversations\.|work item|bug created|shortcut|interactions|prefetch|description|signing|payload|modal|waituntil|wit\/|html page instead of file|skipped for ado|link attachment/i;

function logMetaString(meta: Record<string, unknown> | null): string {
  if (!meta || typeof meta !== "object") return "";
  try {
    return JSON.stringify(meta);
  } catch {
    return "";
  }
}

function logMatchesPipeline(row: LogRow): boolean {
  if (PIPELINE_LOG_MESSAGE_RE.test(row.message)) return true;
  return PIPELINE_LOG_MESSAGE_RE.test(logMetaString(row.meta));
}

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
    hasAppBaseUrl: boolean;
  };
  /** Full Slack Interactivity Request URL, or null if APP_BASE_URL is unset. */
  slackInteractionsUrl: string | null;
  /** Event Subscriptions Request URL (`reaction_added` / :ladybug:), or null. */
  slackEventsUrl: string | null;
  /** Per-file MB cap (ADO Services = 60; on-prem can raise via env). */
  slackMediaPerFileCapMb: number;
}) {
  const {
    settings,
    logs,
    envStatus,
    slackInteractionsUrl,
    slackEventsUrl,
    slackMediaPerFileCapMb,
  } = props;
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
            (browser prompt). Automation, OpenAI, Slack→ADO media, QA pool, and
            ADO org/project overrides are stored in Postgres. Secrets (tokens,
            PAT, DATABASE_URL) and process-template env (required fields, TCM
            tab toggles) stay in environment variables — see README.
          </p>
        </div>
      </div>

      <AdminActivityDigest logs={logs} />

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
          <li>
            APP_BASE_URL (Slack URL preview):{" "}
            <Status ok={envStatus.hasAppBaseUrl} />
          </li>
        </ul>
        <div className="mt-4 space-y-2 text-xs text-[var(--muted)]">
          <p>
            Slack <strong className="font-medium text-[var(--text)]">
              Interactivity
            </strong>{" "}
            (shortcuts):{" "}
            {slackInteractionsUrl ? (
              <code className="break-all text-[var(--accent)]">
                {slackInteractionsUrl}
              </code>
            ) : (
              <span className="text-[var(--danger)]">
                Set{" "}
                <code className="text-[var(--accent)]">APP_BASE_URL</code> for a
                full URL preview.
              </span>
            )}
          </p>
          <p>
            Slack{" "}
            <strong className="font-medium text-[var(--text)]">
              Event Subscriptions
            </strong>{" "}
            (<code className="text-[var(--accent)]">reaction_added</code> /{" "}
            :ladybug:):{" "}
            {slackEventsUrl ? (
              <code className="break-all text-[var(--accent)]">
                {slackEventsUrl}
              </code>
            ) : (
              <span className="text-[var(--danger)]">
                Same as above — needs{" "}
                <code className="text-[var(--accent)]">APP_BASE_URL</code>.
              </span>
            )}
          </p>
        </div>
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
          <div className="mt-8 border-t border-[var(--border)] pt-6">
            <h3 className="text-base font-medium">Slack → ADO attachments</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Images and videos from the Slack message are downloaded on the
              server (URLs from{" "}
              <code className="text-[var(--accent)]">conversations.history</code>{" "}
              / replies, then{" "}
              <code className="text-[var(--accent)]">url_private_download</code>
              ), uploaded to ADO as attachments, then embedded in{" "}
              <code className="text-[var(--accent)]">System.Description</code>{" "}
              as <code className="text-[var(--accent)]">&lt;img&gt;</code> / video
              links. Azure DevOps Services allows{" "}
              <strong className="text-[var(--text)]">60 MB</strong> per file and{" "}
              <strong className="text-[var(--text)]">100</strong> attachments per
              work item. Bot scopes:{" "}
              <code className="text-[var(--accent)]">files:read</code>,{" "}
              <code className="text-[var(--accent)]">channels:history</code>,{" "}
              <code className="text-[var(--accent)]">groups:history</code>. Env{" "}
              <code className="text-[var(--accent)]">
                AZURE_DEVOPS_DISABLE_SLACK_ATTACHMENTS=1
              </code>{" "}
              forces off even if enabled here.
            </p>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="slackMediaAttachmentsEnabled"
                value="on"
                defaultChecked={settings.slackMediaAttachmentsEnabled}
                className="h-4 w-4 rounded border-[var(--border)]"
              />
              <span>
                Attach screenshots and videos from the Slack message to the
                bug
              </span>
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-[var(--muted)]">
                  Max file size (MB per file)
                </span>
                <input
                  type="number"
                  name="slackMediaMaxMegabytes"
                  min={1}
                  max={slackMediaPerFileCapMb}
                  step={1}
                  defaultValue={Math.min(
                    slackMediaPerFileCapMb,
                    Math.max(
                      1,
                      Math.round(
                        settings.slackMediaMaxBytesPerFile / 1024 / 1024,
                      ),
                    ),
                  )}
                  className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-[var(--muted)]">
                  Max media files per bug
                </span>
                <input
                  type="number"
                  name="slackMediaMaxFilesPerBug"
                  min={1}
                  max={20}
                  step={1}
                  defaultValue={settings.slackMediaMaxFilesPerBug}
                  className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </label>
            </div>
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
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="openaiRefineSecondPass"
              value="on"
              defaultChecked={settings.openaiRefineSecondPass}
              className="h-4 w-4 rounded border-[var(--border)]"
            />
            <span>
              Second OpenAI pass (polish JSON before ADO; ~2× model calls per
              bug). Env{" "}
              <code className="text-[var(--accent)]">
                OPENAI_BUG_REFINE_SECOND_PASS=0
              </code>{" "}
              forces off.
            </span>
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
              <option value="none">None (unassigned)</option>
              <option value="reporter">Assign to reporter (Slack user who ran the shortcut)</option>
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
        <h2 className="text-lg font-medium">All recent log entries</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Newest first (same data as above, full table). Use the digest at the top
          for Slack screenshots and Azure DevOps attachment issues.
        </p>
        <div className="mt-4 max-h-96 overflow-auto text-sm">
          <LogTable rows={logs} emptyLabel="No log entries yet." />
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

function LogTable({
  rows,
  emptyLabel,
}: {
  rows: LogRow[];
  emptyLabel: string;
}) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-[var(--border)] text-[var(--muted)]">
          <th className="py-2 pr-4 font-medium">Time</th>
          <th className="py-2 pr-4 font-medium">Level</th>
          <th className="py-2 font-medium">Message</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={3} className="py-4 text-[var(--muted)]">
              {emptyLabel}
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[var(--border)]/60 align-top"
            >
              <td className="py-2 pr-4 whitespace-nowrap text-[var(--muted)]">
                {row.createdAt
                  ? new Date(row.createdAt).toLocaleString()
                  : "—"}
              </td>
              <td className="py-2 pr-4">
                <span
                  className={
                    row.level === "error"
                      ? "text-[var(--danger)]"
                      : row.level === "warn"
                        ? "text-amber-600 dark:text-amber-400"
                        : ""
                  }
                >
                  {row.level}
                </span>
              </td>
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
  );
}

function AdminActivityDigest({ logs }: { logs: LogRow[] }) {
  const alerts = logs.filter(
    (r) => r.level === "error" || r.level === "warn",
  ).slice(0, 25);
  const pipeline = logs.filter(logMatchesPipeline).slice(0, 30);

  return (
    <section className="mt-10 space-y-6">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-medium">Activity digest</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Errors, warnings, and Slack → screenshots → Azure DevOps steps in one
          place (no need to hunt in Vercel). Ukrainian: тут зведено попередження
          та кроки пайплайну багів і медіа.
        </p>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6 dark:border-amber-400/25">
        <h3 className="text-base font-semibold text-amber-900 dark:text-amber-100">
          Errors &amp; warnings (latest 25)
        </h3>
        <p className="mt-1 text-xs text-[var(--muted)]">
          If screenshots fail, check here first — then the pipeline rows below.
        </p>
        <div className="mt-3 max-h-72 overflow-auto text-sm">
          <LogTable
            rows={alerts}
            emptyLabel="No errors or warnings in the loaded log window."
          />
        </div>
      </div>

      <div className="rounded-lg border border-[var(--accent)]/35 bg-[var(--surface)] p-6">
        <h3 className="text-base font-semibold">
          Slack → OpenAI → ADO / attachments (latest 30 matches)
        </h3>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Filtered from all levels: shortcuts, media prefetch,{" "}
          <code className="text-[var(--accent)]">files.info</code>, downloads,
          work item create, description patch, signing, etc.
        </p>
        <div className="mt-3 max-h-80 overflow-auto text-sm">
          <LogTable
            rows={pipeline}
            emptyLabel="No pipeline-related log lines yet — create a bug from Slack to generate entries."
          />
        </div>
      </div>
    </section>
  );
}
