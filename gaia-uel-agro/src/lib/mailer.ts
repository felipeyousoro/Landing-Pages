import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Configuração SMTP ausente. Defina SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS."
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
      "Configuração CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL ausente."
    );
  }

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2a24;">
      <h2 style="color: #00753B;">Nova mensagem pelo site do GAIA</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Mensagem:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  await getTransporter().sendMail({
    from: `"Site GAIA UEL Agro" <${fromAddress}>`,
    to: toAddress,
    replyTo: email,
    subject: `Nova mensagem de contato de ${name}`,
    html,
    text: `Nome: ${name}\nE-mail: ${email}${phone ? `\nTelefone: ${phone}` : ""}\n\nMensagem:\n${message}`,
  });
}
