/**
 * Timing-safe UTF-8 comparison (Edge-safe; no Node crypto).
 */
export function timingSafeEqualUtf8(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i]! ^ bb[i]!;
  return diff === 0;
}

export function parseBasicAuth(
  authorization: string | null,
): { user: string; password: string } | null {
  if (!authorization || !authorization.startsWith("Basic ")) return null;
  const b64 = authorization.slice(6).trim();
  let decoded: string;
  try {
    decoded = atob(b64);
  } catch {
    return null;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return null;
  return {
    user: decoded.slice(0, colon),
    password: decoded.slice(colon + 1),
  };
}

export function verifyBasicAuth(
  authorization: string | null,
  expectedUser: string | undefined,
  expectedPassword: string | undefined,
): boolean {
  if (!expectedUser || !expectedPassword) return false;
  const parsed = parseBasicAuth(authorization);
  if (!parsed) return false;
  return (
    timingSafeEqualUtf8(parsed.user, expectedUser) &&
    timingSafeEqualUtf8(parsed.password, expectedPassword)
  );
}
