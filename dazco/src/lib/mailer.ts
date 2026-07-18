import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Missing SMTP configuration. Please set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS."
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type ContactEmailInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function sendContactEmail({ name, email, phone, message }: ContactEmailInput) {
  const toAddress = process.env.CONTACT_TO_EMAIL;
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER;

  if (!toAddress || !fromAddress) {
    throw new Error(
      "Missing CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL configuration."
    );
  }

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #3c3c3c;">
      <h2 style="color: #ea6e24;">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"Dazco Website" <${fromAddress}>`,
    to: toAddress,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    html,
    text: `Name: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\n\nMessage:\n${message}`,
  });
}
