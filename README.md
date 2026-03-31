# Buggybot

Next.js **App Router** + **TypeScript** app for **Vercel**: Slack **message shortcuts** over **HTTP Interactivity** (no Socket Mode), **Azure DevOps REST** only, **OpenAI** for structured bug JSON, and **Postgres** via **[Neon through the Vercel Marketplace](https://vercel.com/marketplace/neon)** (recommended) for settings, idempotency, and logs. The app reads **`DATABASE_URL` only**—the standard pooled `postgresql://…` string Vercel injects after you connect Neon. **No Redis, queues, Docker, or self-hosted database.**

---

## 1. Full project structure

```text
buggybot/
├── README.md
├── schema.sql                 # Standalone SQL (same tables as Drizzle)
├── .env.example
├── .gitignore
├── drizzle.config.ts
├── drizzle/
│   └── 0000_init.sql          # Copy of schema for reference / manual apply
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── src/
│   ├── middleware.ts          # HTTP Basic Auth for /admin
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx       # Settings + logs (protected)
│   │   │   ├── admin-panel.tsx
│   │   │   └── actions.ts     # Server Actions (re-check Basic auth)
│   │   └── api/
│   │       └── slack/
│   │           └── route.ts   # Slack Interactivity POST
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts          # Drizzle schema
│   └── lib/
│       ├── assignment.ts      # Round-robin / random QA
│       ├── azure-devops.ts    # REST: create Bug + comment
│       ├── basic-auth.ts      # Parse & verify Basic header (Edge-safe)
│       ├── errors.ts          # formatError()
│       ├── logger.ts          # logEvent, logError → app_logs
│       ├── openai-bug.ts      # Structured bug JSON
│       ├── settings-types.ts
│       ├── settings.ts
│       ├── slack-payload.ts
│       ├── slack-process.ts   # Main shortcut pipeline
│       └── slack-verify.ts    # Slack signing secret HMAC
```

---

## 2. Setup (local)

1. **Clone / copy** this project and install dependencies:

   ```bash
   cd buggybot
   npm install
   ```

2. **Postgres (Neon)** — create a Neon project and use the **pooled** connection string (Neon’s dashboard labels this clearly; it works with serverless and PgBouncer). Put it in `.env` as **`DATABASE_URL`**—the app does not read any other database env var.

3. **Apply the schema** once (pick one):

   - **Neon SQL Editor**: paste and run the contents of `schema.sql`, or  
   - **CLI** (same URL as in `.env`):

     ```bash
     cp .env.example .env
     # set DATABASE_URL and other vars in .env
     psql "$DATABASE_URL" -f schema.sql
     ```

   - **Drizzle** (also uses only `DATABASE_URL`):

     ```bash
     npm run db:push
     ```

4. **Environment file**:

   ```bash
   cp .env.example .env
   ```

   Fill **every required variable** from **section 6** below. **`DATABASE_URL` must be the full Neon connection string** (Vercel/Neon usually include `sslmode=require` in the URL).

5. **Run the dev server**:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).  
   Open [http://localhost:3000/admin](http://localhost:3000/admin) — the browser will prompt for **Basic Auth** (`ADMIN_BASIC_AUTH_USER` / `ADMIN_BASIC_AUTH_PASSWORD`).

7. **Production build**:

   ```bash
   npm run build && npm start
   ```

---

## 3. SQL schema (small database)

Canonical file: **`schema.sql`** (root). Tables:

| Table | Purpose |
|-------|---------|
| `app_settings` | Key/value JSON for app preferences (e.g. `main` settings row) |
| `slack_message_bugs` | Idempotency: unique `(team_id, channel_id, message_ts)` |
| `app_logs` | Recent operational logs (`info` / `warn` / `error`) |

Drizzle mirrors this in `src/db/schema.ts` for the app runtime.

**Runtime:** `src/db/index.ts` uses **`postgres.js`** with **`process.env.DATABASE_URL` only** (trimmed). Options **`prepare: false`** and **`max: 1`** match Neon’s **pooled** URLs and serverless functions. No other database env vars are read.

---

## 4. Slack setup (exact)

All delivery is **HTTP POST** to your deployed `/api/slack`. **No Socket Mode.**

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch**.

2. **OAuth & Permissions** → **Scopes** → **Bot Token Scopes** — add:
   - `chat:write` — post thread replies  
   - `channels:read` — `chat.getPermalink` in public channels  
   - `groups:read` — same for private channels the bot is in  

3. **Install to Workspace** → copy **Bot User OAuth Token** → `SLACK_BOT_TOKEN` in `.env`.

4. **Basic Information** → **App Credentials** → copy **Signing Secret** → `SLACK_SIGNING_SECRET`.

5. **Interactivity & Shortcuts**:
   - Turn **Interactivity** **On**.
   - **Request URL**: `https://<YOUR_DOMAIN>/api/slack`  
     (local dev: use [ngrok](https://ngrok.com) or similar — Slack cannot reach `localhost`.)

6. Under **Shortcuts** → **Create New Shortcut**:
   - **Location**: **On messages**
   - **Name**: `Create Azure Bug` (any label is fine)
   - **Short description**: e.g. `Create an Azure DevOps bug from this message`
   - **Callback ID**: **`create_azure_bug`** — must match `SLACK_SHORTCUT_CALLBACK_ID` in `src/lib/slack-process.ts`.

7. **Reinstall** the app if Slack prompts after scope changes.

8. In Slack, **invite the bot** to channels where the shortcut will be used: `/invite @YourBotName`.

---

## 5. Vercel deployment (exact, Neon via Marketplace)

1. Push the repo to GitHub (or GitLab / Bitbucket).

2. In [Vercel](https://vercel.com) → **Add New** → **Project** → import the repo.

3. **Framework Preset**: Next.js (auto-detected).

4. **Add Neon Postgres** (preferred):
   - Open the Vercel project → **Storage** tab → **Create Database** → choose **Neon** (or [Marketplace → Neon](https://vercel.com/marketplace/neon)).
   - Complete the flow; Vercel **automatically adds `DATABASE_URL`** to the project environment (pooled `postgresql://…` string).  
   - The application code uses **`process.env.DATABASE_URL` only**—no fallbacks to `POSTGRES_URL` or other names.

5. **Apply schema on the Neon database** (once per environment):
   - **Neon Console** → your project → **SQL Editor** → run `schema.sql`, or  
   - Locally: `vercel env pull` then `psql "$DATABASE_URL" -f schema.sql` using the pulled value.

6. **Environment Variables** — in Vercel → **Settings** → **Environment Variables**, add the **remaining** variables from **section 6** (`SLACK_*`, `OPENAI_*`, `AZURE_DEVOPS_*`, `ADMIN_BASIC_AUTH_*`, etc.). Do **not** replace `DATABASE_URL` unless you know what you’re doing—it should already be set by the Neon integration.

7. Deploy. Optionally set **`NEXT_PUBLIC_APP_URL`** to your production URL (e.g. `https://buggybot.vercel.app`) so `/admin` shows the correct Slack Request URL hint.

8. In the Slack app settings, set **Interactivity Request URL** to:

   `https://<your-vercel-domain>/api/slack`

9. **Vercel** → **Project** → **Settings** → **Functions**: this app sets `maxDuration = 60` on `/api/slack` so the `after()` task (OpenAI + Azure DevOps) can finish.

---

## 6. Required environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | **Yes** | **Only** Postgres URL the app reads. Use Neon’s **pooled** `postgresql://…` string (injected by Vercel when you add Neon from Storage / Marketplace). |
| `SLACK_BOT_TOKEN` | **Yes** | Bot OAuth token (`xoxb-...`) |
| `SLACK_SIGNING_SECRET` | **Yes** | Slack signing secret for request verification |
| `OPENAI_API_KEY` | **Yes** | OpenAI API key |
| `AZURE_DEVOPS_PAT` | **Yes** | PAT with Work Items (read/write) via REST |
| `AZURE_DEVOPS_ORG` | **Yes** | Azure DevOps organization name (unless overridden in DB only — env still recommended) |
| `AZURE_DEVOPS_PROJECT` | **Yes** | Project name |
| `ADMIN_BASIC_AUTH_USER` | **Yes** | Basic auth username for `/admin` |
| `ADMIN_BASIC_AUTH_PASSWORD` | **Yes** | Basic auth password for `/admin` |

**Optional:**

| Variable | Description |
|----------|-------------|
| `OPENAI_MODEL` | Default model if not set in admin (default in code: `gpt-4o-mini`) |
| `AZURE_DEVOPS_WORK_ITEM_TYPE` | Work item type segment (default `Bug`) |
| `NEXT_PUBLIC_APP_URL` | Public site URL for admin UI hints |

**Not read by this app:** `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `DATABASE_URL_UNPOOLED`, or any other Postgres env name—only **`DATABASE_URL`**.

---

## 7. Protected `/admin` (HTTP Basic Auth)

- **`src/middleware.ts`** protects `/admin` and `/admin/*` with **RFC 7617 Basic** authentication.
- Valid credentials: `ADMIN_BASIC_AUTH_USER` + `ADMIN_BASIC_AUTH_PASSWORD`.
- Missing vars → **503** plain-text error.
- Wrong/missing header → **401** + `WWW-Authenticate: Basic realm="Buggybot Admin"`.
- **Server Actions** in `src/app/admin/actions.ts` **re-verify** the `Authorization` header so direct POSTs cannot bypass the UI.

To sign out: close the session using the browser’s password manager / “sign out” for the site, or use a private window.

---

## 8. Error handling and logs

- **`logEvent(level, message, meta?)`** — writes to `app_logs` (failures fall back to `console.error`).
- **`logError(message, err, meta?)`** — formats `err` with **`formatError`**, logs to DB + **stderr**.
- **`POST /api/slack`** — verifies signature; logs warnings/errors; uses **`after()`** for the shortcut pipeline; wraps unhandled failures with **`logError`** and returns **500** without leaking details in the body.
- **Shortcut pipeline** — Slack thread replies for user-visible outcomes; **`logError`** / **`logEvent`** for operational trace (including permalink failures, low confidence skips, ADO errors).

---

## 9. Behavior summary

- Message shortcut **`create_azure_bug`** → verify Slack signature → **200 OK** immediately → background: idempotency row, OpenAI structured bug, optional Azure DevOps **Bug** + **comment** (Slack link), QA assignee from pool, thread reply with work item link.

## License

MIT
