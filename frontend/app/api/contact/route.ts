import { NextResponse } from "next/server";

export const runtime = "nodejs";
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

/**
 * Contact endpoint. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (a verified Resend sender)
 * in .env.local to send real email. Without them it validates and responds { demo: true } (nothing is sent).
 */
export async function POST(req: Request) {
  let b: Record<string, string>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }
  const f = (k: string) => String(b[k] ?? "").trim();
  const errors: Record<string, string> = {};
  if (f("name").length < 2) errors.name = "Please enter your name.";
  if (!isEmail(f("email"))) errors.email = "Please enter a valid email.";
  if (!f("service")) errors.service = "Choose a service.";
  if (f("message").length < 10) errors.message = "Tell us a little more (10+ characters).";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });
  if (f("website")) return NextResponse.json({ ok: true, demo: true }); // honeypot

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return NextResponse.json({ ok: true, demo: true });

  const html = `<h2>New enquiry</h2><p><b>Name:</b> ${esc(f("name"))}<br><b>Email:</b> ${esc(f("email"))}<br><b>Company:</b> ${esc(f("company"))}<br><b>Service:</b> ${esc(f("service"))}<br><b>Budget:</b> ${esc(f("budget"))}</p><p>${esc(f("message")).replace(/\n/g, "<br>")}</p>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, reply_to: f("email"), subject: `New enquiry from ${f("name")}`, html }),
  });
  if (!r.ok) return NextResponse.json({ ok: false, error: "Email service rejected the message." }, { status: 502 });
  return NextResponse.json({ ok: true, demo: false });
}
