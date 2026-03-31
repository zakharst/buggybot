import { getRecentLogs } from "@/lib/logger";
import { getSettings } from "@/lib/settings";
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
  const [settings, logs] = await Promise.all([
    getSettings(),
    getRecentLogs(80),
  ]);

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
      }}
    />
  );
}
