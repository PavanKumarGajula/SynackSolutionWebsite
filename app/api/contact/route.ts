import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { name, company, email, phone, message, source } = await req.json();

  if (!name || !company || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    await Promise.all([
      // Notification to site owner
      transporter.sendMail({
        from: `"SynAck Website" <${process.env.GMAIL_USER}>`,
        to: process.env.CONTACT_RECIPIENT,
        replyTo: email,
        subject: `New contact from ${name} — ${company}`,
        html: `
          <h2 style="font-family:sans-serif;margin-bottom:16px;">New Contact Form Submission</h2>
          <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0;font-weight:600">${company}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Source</td><td style="padding:8px 0">${source || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${message}</td></tr>
          </table>
        `,
      }),

      // Confirmation to the submitter
      transporter.sendMail({
        from: `"SynAck Solutions" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `We received your message, ${name.split(" ")[0]}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px">
            <h2 style="margin-bottom:8px;">Thanks for reaching out.</h2>
            <p style="color:#374151;line-height:1.7;">Hi ${name.split(" ")[0]},</p>
            <p style="color:#374151;line-height:1.7;">
              We received your message and a senior engineer will be in touch within 24 hours.
              In the meantime, feel free to call us at <strong>(858) 429-3000</strong> if it's urgent.
            </p>
            <p style="color:#6b7280;font-size:13px;margin-top:24px;">— The SynAck Solutions Team</p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form mail error:", err);
    return NextResponse.json({ error: "Failed to send message. Try again later." }, { status: 500 });
  }
}
