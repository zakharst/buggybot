import { getRecentLogs } from "@/lib/logger";
import { getSettings } from "@/lib/settings";
import { formatError } from "@/lib/errors";
import { AdminPanel } from "./admin-panel";

export const dynamic = "force-dynamic";

function publicBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export default async function AdminPage() {
  let settings: Awaited<ReturnType<typeof getSettings>>;
  let logs: Awaited<ReturnType<typeof getRecentLogs>>;
  try {
    [settings, logs] = await Promise.all([
      getSettings(),
      getRecentLogs(80),
    ]);
  } catch (e) {
    const detail = formatError(e);
    return (
      <main className="mx-auto max-w-xl px-6 py-16 text-[var(--text)]">
        <h1 className="text-xl font-semibold">Admin — database error</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          The app could not use Postgres. On Vercel, add{" "}
          <strong className="text-[var(--text)]">Neon</strong> under{" "}
          <strong className="text-[var(--text)]">Storage</strong> so{" "}
          <code className="text-[var(--accent)]">DATABASE_URL</code> is set, run{" "}
          <code className="text-[var(--accent)]">schema.sql</code> once, then redeploy.
        </p>
        <pre className="mt-6 max-h-48 overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 text-xs text-[var(--danger)]">
          {detail}
        </pre>
      </main>
    );
  }

  const slackApiUrl = `${publicBaseUrl()}/api/slack`;

  return (
    <AdminPanel
      settings={settings}
      logs={logs}
      slackApiUrl={slackApiUrl}
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
      }}
    />
  );
}
