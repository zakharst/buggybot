import {
  timingSafeEqualUtf8,
  verifyBasicAuth,
} from "@/lib/basic-auth";

/**
 * Same credentials as `/admin`, or optional long-lived Bearer (see `ADMIN_LOGS_BEARER`).
 */
export function verifyAdminLogsExportAuth(req: Request): boolean {
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const pass = process.env.ADMIN_BASIC_AUTH_PASSWORD;
  if (verifyBasicAuth(req.headers.get("authorization"), user, pass)) {
    return true;
  }
  const secret = process.env.ADMIN_LOGS_BEARER?.trim();
  if (!secret) return false;
  const h = req.headers.get("authorization");
  if (!h?.startsWith("Bearer ")) return false;
  const token = h.slice(7).trim();
  return timingSafeEqualUtf8(token, secret);
}
