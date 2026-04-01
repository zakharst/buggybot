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
├── config/
│   ├── ado-bug-field-refs.defaults.json   # Default ref names for tabs / Reported from
│   ├── ado-bug-required-field-refs.json   # alwaysRequired refs snapshot (OpenAI prompt)
│   ├── openai-bug-examples.json           # systemPromptExtra + JSON few-shot (optional)
│   ├── openai-bug-backlog-examples.md     # long backlog → system prompt (optional)
│   └── openai-bug-style-guide.md          # derived rules + excerpts (npm run openai:derive-style-from-backlog)
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
│       ├── azure-devops.ts    # REST: create Bug; Slack link in Description footer
│       ├── ado-bug-resolved-refs.ts  # Default Bug field refs (from config/*.json + env)
│       ├── basic-auth.ts      # Parse & verify Basic header (Edge-safe)
│       ├── errors.ts          # formatError()
│       ├── logger.ts          # logEvent, logError → app_logs
│       ├── openai-bug.ts      # Structured bug JSON (+ openai-bug-examples.json few-shot)
│       ├── settings-types.ts
│       ├── settings.ts
│       ├── slack-ado-media-limits.ts  # ADO attachment caps + RAM budget (Slack→ADO)
│       ├── slack-file-media-utils.ts # infer image/video when Slack sends octet-stream/binary
│       ├── slack-message-media.ts  # Slack images/videos → ADO attachments
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

8. **Automated tests** (no live Slack, OpenAI, or Azure DevOps):

   ```bash
   npm test
   ```

   [Vitest](https://vitest.dev/) runs **`src/**/*.test.ts`**: Slack [request signature](https://api.slack.com/authentication/verifying-requests-from-slack) (`verifySlackRequest`), shortcut payload normalization, **Slack file rows** that look like `application/octet-stream` + `filetype: binary` but are really PNG/JPEG (the common screenshot case), **`buildSlackMediaEmbedsHtml`** so Description gets `<img>` even when the stored MIME is wrong, **`bugIntakeSchema`** (environment/platform normalization), **assignment** modes, and **ADO attachment** env defaults. Slack downloads are tested with a **mock** `fetch` and a stub `WebClient` — you do not need tokens or network to catch regressions in the media pipeline.

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

Slack **Interactivity** POSTs go to **`${APP_BASE_URL}/api/slack/interactions`** (same handler as legacy **`/api/slack`**). **No Socket Mode.**

**Message shortcuts** (“On messages”) send `payload.type === "message_action"` (not `"shortcut"`). The app accepts **both** `message_action` and global `shortcut` payloads with callback ID **`create_azure_bug`**.

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch**.

2. **OAuth & Permissions** → **Scopes** → **Bot Token Scopes** — add:
   - `chat:write` — post thread replies  
   - `channels:read` — `chat.getPermalink` in public channels  
   - `groups:read` — same for private channels the bot is in  
   - `files:read` — download **screenshots and videos** from the message to attach in Azure DevOps  
   - `channels:history` — read the message (including `files`) in public channels  
   - `groups:history` — same in private channels the bot is in  

3. **Install to Workspace** → copy **Bot User OAuth Token** → `SLACK_BOT_TOKEN` in `.env`.

4. **Basic Information** → **App Credentials** → copy **Signing Secret** → `SLACK_SIGNING_SECRET`.

5. **Interactivity & Shortcuts**:
   - Turn **Interactivity** **On**.
   - **Request URL**: **`${APP_BASE_URL}/api/slack/interactions`** (set `APP_BASE_URL` to your public origin, e.g. `https://buggybot.vercel.app`).  
     Local dev: use [ngrok](https://ngrok.com) with the same path — Slack cannot reach `localhost` directly.

6. Under **Shortcuts** → **Create New Shortcut**:
   - **Location**: **On messages**
   - **Name**: `Create Azure Bug` (any label is fine)
   - **Short description**: e.g. `Create an Azure DevOps bug from this message`
   - **Callback ID**: **`create_azure_bug`** — must match `SLACK_SHORTCUT_CALLBACK_ID` in `src/lib/slack-process.ts`.

7. **Reinstall** the app if Slack prompts after scope changes.

8. In Slack, **invite the bot** to channels where the shortcut will be used: `/invite @YourBotName`.

**If images/videos don’t appear in ADO:**

- **/admin** → **Slack → ADO attachments** must be on; env **`AZURE_DEVOPS_DISABLE_SLACK_ATTACHMENTS=1`** forces them off.
- Bot must be **in the channel** (`/invite @YourBot`). Without **`channels:history`** / **`groups:history`** (and the bot in that channel), Slack returns no message → no `files`.
- After adding **`files:read`**, **reinstall** the app and confirm the token starts with `xoxb-`.
- Only **file uploads** on that message are synced (Slack’s `files` on the message). Some clients show images only inside Block Kit without a hosted `files` entry — there is nothing to download.
- Check **/admin** logs for **`Slack conversations.history failed`**, **`no download URL`**, **`slack media skipped for ADO`**, or **`ADO media attachment step error`**.

---

## 5. Vercel deployment (exact, Neon via Marketplace)

1. Push the repo to GitHub (or GitLab / Bitbucket).

2. In [Vercel](https://vercel.com) → **Add New** → **Project** → import the repo.

3. **Framework Preset**: Next.js (auto-detected).

4. **Add Neon Postgres** (preferred):
   - Open the Vercel project → **Storage** tab → **Create Database** → choose **Neon** (or [Marketplace → Neon](https://vercel.com/marketplace/neon)).
   - Complete the flow; Vercel **automatically adds `DATABASE_URL`** to the project environment (pooled `postgresql://…` string).  
   - The application code uses **`process.env.DATABASE_URL` only**—no fallbacks to `POSTGRES_URL` or other names.

5. **Database tables** — on each Vercel production build, `prebuild` runs `drizzle-kit push --force` against `DATABASE_URL` (see `scripts/vercel-db-push.mjs`), so tables are created or updated automatically. You can still run `schema.sql` manually in Neon **SQL Editor** if you prefer.

6. **Environment Variables** — in Vercel → **Settings** → **Environment Variables**, add the **remaining** variables from **section 6** (`APP_BASE_URL`, `SLACK_*`, `OPENAI_*`, `AZURE_DEVOPS_*`, `ADMIN_BASIC_AUTH_*`, etc.). Do **not** replace `DATABASE_URL` unless you know what you’re doing—it should already be set by the Neon integration.

7. Set **`APP_BASE_URL`** to your production origin with **no trailing slash**, e.g. `https://buggybot.vercel.app`. The `/admin` page uses **only** this variable to show the Slack Interactivity URL (no `VERCEL_URL` / `NEXT_PUBLIC_*` fallbacks).

8. Deploy. In Slack, set **Interactivity Request URL** to the value shown in **Admin** (same as `APP_BASE_URL` + `/api/slack/interactions`).

9. **Vercel** → **Project** → **Settings** → **Functions**: this app sets `maxDuration = 60` on the Slack API routes. Background work after the empty 200 ack uses **`waitUntil()`** from `@vercel/functions` so OpenAI + Azure DevOps + Slack replies still run on serverless (unlike relying on `after()` alone, which may not extend the invocation on all runtimes).

---

## 6. Required environment variables

**Azure DevOps — align your process with the bot (local, one PAT; not called when users create bugs from Slack):**

1. **`npm run ado:inspect-bug-layout`** — For each value Buggybot sends (title, description, Repro Steps tab, System Info, Acceptance Criteria, Reported from, …), checks that **`referenceName` exists on your Bug type**. Shows ❌ where defaults in **`config/ado-bug-field-refs.defaults.json`** do not match your process → set the matching **`AZURE_DEVOPS_*_FIELD_REF`** env vars. Runtime resolution lives in **`src/lib/ado-bug-resolved-refs.ts`** + **`src/lib/azure-devops.ts`**.
2. **`npm run ado:list-bug-fields`** — Prints **`alwaysRequired`** fields and a starter **`AZURE_DEVOPS_REQUIRED_FIELD_VALUES`** JSON (Area, Iteration, picklists).
3. **`npm run ado:snapshot-required-field-refs`** — Refreshes **`config/ado-bug-required-field-refs.json`** bundled for the OpenAI intake prompt.

**OpenAI — backlog style (no ADO call when users file from Slack):**

1. **`config/openai-bug-style-guide.md`** — **Primary** context for tone/shape (rules + stratified excerpts). Regenerate: **`npm run openai:derive-style-from-backlog`** after **`ado:snapshot-bug-backlog-md`**. Optional path: **`OPENAI_BUG_STYLE_GUIDE_MD`**.
2. **`config/openai-bug-backlog-examples.md`** — Full export (optional at **runtime**). By default the app **does not** append the raw backlog when the style guide file is present (saves tokens on both passes; refine never includes raw backlog unless you set **`OPENAI_BUG_REFINE_RAW_BACKLOG_MAX_CHARS`**). To force raw examples on intake, set **`OPENAI_BUG_RAW_BACKLOG_MAX_CHARS`** (e.g. `120000`). If there is **no** style guide on disk, intake falls back to **48k** chars of raw backlog. Regenerate export: **`npm run ado:snapshot-bug-backlog-md`**. Optional path: **`OPENAI_BACKLOG_EXAMPLES_MD`**. Both markdown files stay in **`outputFileTracingIncludes`** for Vercel.
3. **`config/openai-bug-examples.json`** → **`systemPromptExtra`**: short org rules. Optional **`examples`**, or **`npm run openai:snapshot-bug-examples`** ( **`OPENAI_BUG_EXAMPLES_COUNT`** ) to fill few-shot from ADO.
4. If **`examples`** is empty, five built-in few-shot pairs in code are used.

**Token-efficient default:** derived style only on intake + refine; raw backlog omitted when **`openai-bug-style-guide.md`** exists. Re-enable raw paste via env (see table below).

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
| `APP_BASE_URL` | **Yes** (prod) | Public site origin only, e.g. `https://buggybot.vercel.app` (no trailing slash). Admin shows `${APP_BASE_URL}/api/slack/interactions` for Slack. If unset, admin shows a warning instead of guessing. |

**Optional:**

| Variable | Description |
|----------|-------------|
| `OPENAI_MODEL` | Default model if not set in admin (default in code: **`gpt-4o`**) |
| `OPENAI_BUG_REFINE_SECOND_PASS` | Set to **`0`** / **`false`** / **`off`** to skip the second polish pass (default: **on**, better ADO text, ~2× OpenAI calls per bug) |
| `SLACK_BUG_APP_BUILD` | First line in Description: **`Build: …`** (default **`3.5.0_OTA_2`**) |
| `ADO_BACKLOG_MD_COUNT` | For **`npm run ado:snapshot-bug-backlog-md`**: how many recent Bugs to export (default **500**, max 500) |
| `ADO_BACKLOG_MD_OUT` | Output path for backlog markdown (default **`config/openai-bug-backlog-examples.md`**) |
| `OPENAI_BACKLOG_EXAMPLES_MD` | Optional path (relative to cwd) to a markdown file of real bugs; default **`config/openai-bug-backlog-examples.md`**. |
| `OPENAI_BUG_STYLE_GUIDE_MD` | Optional path to derived style guide; default **`config/openai-bug-style-guide.md`**. Regenerate with **`npm run openai:derive-style-from-backlog`**. |
| `OPENAI_BUG_RAW_BACKLOG_MAX_CHARS` | Max chars of raw backlog appended on **intake** (0 = off). Default: **0** when style guide file exists, else **48000**. Example to restore old behavior: **`120000`**. |
| `OPENAI_BUG_REFINE_RAW_BACKLOG_MAX_CHARS` | Raw backlog on **refine** pass; default **0** (style guide + draft only). Set to match intake if you want. |
| `AZURE_DEVOPS_WORK_ITEM_TYPE` | Work item type segment (default `Bug`) |
| `AZURE_DEVOPS_REQUIRED_FIELD_VALUES` | Optional JSON **object** of field ref → value, applied on every create. **No WIQL or work-item fetch at create**—set this once in Vercel (or `.env`) and update when Area/Sprint/tags change. Keys for title, description, severity, and assignee are ignored. **Empty strings are dropped** (picklists reject them). **Discover fields:** `npm run ado:list-bug-fields`. |
| `AZURE_DEVOPS_REPORTED_FROM` | Overrides the built-in default **`DT team`** for **`Custom.Reportedfrom`** on every Slack create (wins over `REQUIRED_FIELD_VALUES`). Must match the picklist exactly (see `ado:list-bug-fields`). |
| `AZURE_DEVOPS_REPORTED_FROM_FIELD_REF` | Optional override when the field reference is not `Custom.Reportedfrom`. |
| `AZURE_DEVOPS_CREATE_EXTRA_PATCH` | Optional JSON array of extra `add` operations (applied **after** `REQUIRED_FIELD_VALUES`, so can override). Paths must start with `/fields/`. **Empty string values are skipped.** |
| `AZURE_DEVOPS_DISABLE_TCM_TAB_FILL` | Set to `1` to stop filling **Repro Steps**, **System Info**, and **Acceptance Criteria** (defaults target standard Azure Boards Bug refs). Use if work item create fails with an unknown field. |
| `AZURE_DEVOPS_DISABLE_ACCEPTANCE_CRITERIA_TAB` | Set to `1` to skip only **Acceptance Criteria** (`Microsoft.VSTS.Common.AcceptanceCriteria`) when your Bug type has no such field. |
| `AZURE_DEVOPS_REPRO_STEPS_FIELD_REF` / `AZURE_DEVOPS_SYSTEM_INFO_FIELD_REF` / `AZURE_DEVOPS_ACCEPTANCE_CRITERIA_FIELD_REF` | Override reference names if your process template uses different fields for those tabs. |
| `AZURE_DEVOPS_DISABLE_SLACK_ATTACHMENTS` | Set to `1` to **force off** Slack → ADO media (overrides **/admin**). Otherwise use **/admin** → **Slack → ADO attachments**. |
| `AZURE_DEVOPS_MAX_ATTACHMENT_BYTES` | Optional. **Azure DevOps Services** hard limit is **60 MB** per attachment (see [object limits](https://learn.microsoft.com/en-us/azure/devops/organizations/settings/work/object-limits)). Default cap in app matches that. On **DevOps Server**, set this if your collection allows a higher per-file size. |
| `SLACK_MEDIA_MAX_TOTAL_BYTES` | Optional. Approximate **sum** of all Slack image/video bytes held in RAM before ADO upload (default **~220 MiB**). Lower on small function memory; raise if you need many large files per message. |
| `SLACK_DEBUG_INTERACTIONS` | Set to `1` to log safe diagnostics (`[slack-debug]…`): pathname, payload type, callback id, message length, OpenAI/ADO/Slack checkpoints. No tokens or message text. |

**Azure DevOps `TF401320` / required picklists:** Put the needed values in **`AZURE_DEVOPS_REQUIRED_FIELD_VALUES`**. **“Reported from”** defaults to **`DT team`**. **`npm run ado:list-bug-fields`** prints allowed values. **`npm run ado:snapshot-required-field-refs`** refreshes **`config/ado-bug-required-field-refs.json`** (bundled at build). For edge cases, **`AZURE_DEVOPS_CREATE_EXTRA_PATCH`**.

**Bug layout (Repro Steps / System Info / Acceptance Criteria):** Slack-created bugs also fill **`Microsoft.VSTS.TCM.ReproSteps`**, **`Microsoft.VSTS.TCM.SystemInfo`**, and **`Microsoft.VSTS.Common.AcceptanceCriteria`** from the OpenAI-structured fields (plus **`System.Description`** as the full QA-style block). If create fails, set **`AZURE_DEVOPS_DISABLE_TCM_TAB_FILL=1`** or adjust field refs / **`AZURE_DEVOPS_DISABLE_ACCEPTANCE_CRITERIA_TAB`**. If the model returns empty sections, **Description** falls back to the **raw Slack message** text. |

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
- **`POST /api/slack/interactions`** (and legacy **`POST /api/slack`**) — verifies signature; logs warnings/errors; schedules the shortcut pipeline with **`waitUntil()`** after a fast 200 ack; wraps unhandled failures with **`logError`** and returns **500** without leaking details in the body.
- **Shortcut pipeline** — Slack thread replies for user-visible outcomes; **`logError`** / **`logEvent`** for operational trace (including permalink failures, low confidence skips, ADO errors).

---

## 9. Behavior summary

- Message shortcut **`create_azure_bug`** → verify Slack signature → **200 OK** immediately → background: idempotency row, OpenAI structured bug (**`Environment: dev|prod`** and **`Platform: iOS|Android`** from the message; **`Production`** tag when environment is **prod**), **`Build:`** from env, Slack media **downloaded from Slack, attached, and embedded** in **Description** (`<img>` for images), **no assignee**, thread reply with work item link.

## License

MIT
