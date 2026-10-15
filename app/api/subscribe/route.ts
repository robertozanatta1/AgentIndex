import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
// TODO: swap for Resend audiences (RESEND_API_KEY) once live. File storage is local/dev only (Vercel FS is read-only).
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  console.log("[subscribe]", email);
  try {
    const file = path.join(process.cwd(), "data", "subscribers.json");
    const list: { email: string; at: string }[] = JSON.parse(await fs.readFile(file, "utf8").catch(() => "[]"));
    if (!list.some((s) => s.email === email)) list.push({ email, at: new Date().toISOString() });
    await fs.writeFile(file, JSON.stringify(list, null, 2));
  } catch (e) { console.warn("[subscribe] could not persist", e); }
  return NextResponse.json({ ok: true });
}
