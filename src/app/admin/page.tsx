import { getRecentLogs } from "@/lib/logger";
import { getSettings } from "@/lib/settings";
import { formatError } from "@/lib/errors";
import { slackMediaPerFileCapMegabytes } from "@/lib/slack-ado-media-limits";
import { AdminPanel } from "./admin-panel";

export const dynamic = "force-dynamic";

function slackUrlFromEnv(path: string): string | null {
  const raw = process.env.APP_BASE_URL?.trim();
  if (!raw) return null;
  const base = raw.replace(/\/$/, "");
  return `${base}${path}`;
}

export default async function AdminPage() {
  let settings: Awaited<ReturnType<typeof getSettings>>;
  let logs: Awaited<ReturnType<typeof getRecentLogs>>;
  try {
    [settings, logs] = await Promise.all([
      getSettings(),
      getRecentLogs(250),
    ]);
  } catch (e) {
    const detail = formatError(e);
    const missingRelation =
      /does not exist/i.test(detail) && /relation|table/i.test(detail);
    return (
      <main className="mx-auto max-w-xl px-6 py-16 text-[var(--text)]">
        <h1 className="text-xl font-semibold">Admin — database error</h1>
        {missingRelation ? (
          <p className="mt-3 text-sm text-[var(--muted)]">
            The database has <strong className="text-[var(--text)]">no tables yet</strong>{" "}
            (common right after connecting Neon). Either{" "}
            <strong className="text-[var(--text)]">Redeploy</strong> on Vercel — the build
            runs <code className="text-[var(--accent)]">drizzle-kit push</code> and creates
            them — or paste <code className="text-[var(--accent)]">schema.sql</code> into
            Neon <strong>SQL Editor</strong> and run it once.
          </p>
        ) : (
          <p className="mt-3 text-sm text-[var(--muted)]">
            Could not reach Postgres. On Vercel: connect{" "}
            <strong className="text-[var(--text)]">Storage → Neon</strong>, ensure{" "}
            <code className="text-[var(--accent)]">DATABASE_URL</code> is set, then redeploy.
          </p>
        )}
        <pre className="mt-6 max-h-48 overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 text-xs text-[var(--danger)]">
          {detail}
        </pre>
      </main>
    );
  }

  return (
    <AdminPanel
      settings={settings}
      logs={logs}
      slackMediaPerFileCapMb={slackMediaPerFileCapMegabytes()}
      slackInteractionsUrl={slackUrlFromEnv("/api/slack/interactions")}
      slackEventsUrl={slackUrlFromEnv("/api/slack/events")}
      envStatus={{
        hasOpenAi: Boolean(process.env.OPENAI_API_KEY),
        hasSlackSigning: Boolean(process.env.SLACK_SIGNING_SECRET),
        hasSlackBot: Boolean(process.env.SLACK_BOT_TOKEN),
        hasAdoPat: Boolean(process.env.AZURE_DEVOPS_PAT),
        envAdoOrg: Boolean(process.env.AZURE_DEVOPS_ORG),
        envAdoProject: Boolean(process.env.AZURE_DEVOPS_PROJECT),
        hasBasicAuth: Boolean(
          process.env.ADMIN_BASIC_AUTH_USER &&
            process.env.ADMIN_BASIC_AUTH_PASSWORD,
        ),
        hasDatabaseUrl: Boolean(process.env.DATABASE_URL?.trim()),
        hasAppBaseUrl: Boolean(process.env.APP_BASE_URL?.trim()),
      }}
    />
  );
}
