import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    if (!resend || !TO_EMAIL) {
      return NextResponse.json({ ok: false, error: "Email service not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL." }, { status: 503 });
    }

    const subject = `New portfolio contact from ${name}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial; color: #e5e7eb; background: #0b0b0b; padding: 24px;">
        <h2 style="margin:0 0 12px 0; color:#fff;">New Message</h2>
        <p style="margin:0 0 8px 0;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <pre style="white-space:pre-wrap; background:#111; padding:16px; border-radius:8px; border:1px solid #222;">${message}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: `Portfolio <onboarding@resend.dev>`,
      to: [TO_EMAIL],
      reply_to: email,
      subject,
      html,
    } as any);

    if (error) {
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Internal server error: " + err }, { status: 500 });
  }
}