import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Buggybot</h1>
      <p className="text-[var(--muted)]">
        Slack message shortcuts create Azure DevOps bugs with OpenAI structuring
        and QA assignment.
      </p>
      <p className="text-sm text-[var(--muted)]">
        Admin uses HTTP Basic Auth (browser username/password prompt).
      </p>
      <Link
        href="/admin"
        className="inline-flex w-fit rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-[var(--bg)] hover:opacity-90"
      >
        Open admin
      </Link>
    </main>
  );
}
