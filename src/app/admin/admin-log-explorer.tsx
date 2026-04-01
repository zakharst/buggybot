"use client";

import { useMemo, useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import type { appLogs } from "@/db/schema";

export type LogRow = InferSelectModel<typeof appLogs>;

export function LogTable({
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

export function AdminLogExplorer({ logs }: { logs: LogRow[] }) {
  const [level, setLevel] = useState<"all" | "error" | "warn" | "info">(
    "all",
  );
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    let rows = logs;
    if (level !== "all") {
      rows = rows.filter((r) => r.level === level);
    }
    const qq = q.trim().toLowerCase();
    if (qq) {
      rows = rows.filter((r) => {
        const msg = r.message.toLowerCase();
        const meta = r.meta ? JSON.stringify(r.meta).toLowerCase() : "";
        return msg.includes(qq) || meta.includes(qq);
      });
    }
    return rows;
  }, [logs, level, q]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[var(--muted)]">Level</span>
        {(["all", "error", "warn", "info"] as const).map((lv) => (
          <button
            key={lv}
            type="button"
            onClick={() => setLevel(lv)}
            className={`rounded-md border px-2 py-1 text-xs capitalize ${
              level === lv
                ? "border-[var(--accent)] bg-[var(--accent)]/15 font-medium text-[var(--text)]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/40"
            }`}
          >
            {lv}
          </button>
        ))}
        <input
          type="search"
          placeholder="Search message or JSON meta…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="min-w-[12rem] flex-1 rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <span className="text-xs tabular-nums text-[var(--muted)]">
          {filtered.length} / {logs.length}
        </span>
      </div>
      <div className="max-h-[min(70vh,36rem)] overflow-auto rounded-md border border-[var(--border)]/60">
        <LogTable
          rows={filtered}
          emptyLabel={
            q || level !== "all"
              ? "No lines match this filter."
              : "No log entries yet."
          }
        />
      </div>
    </div>
  );
}
