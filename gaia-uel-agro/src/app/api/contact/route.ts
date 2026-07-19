import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/contact-schema";
import { isMailEnabled } from "@/lib/feature-flags";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  if (!isMailEnabled()) {
    return NextResponse.json(
      { error: "O envio de mensagens está desativado no momento." },
      { status: 404 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Dados do formulário inválidos.";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Falha ao enviar e-mail de contato:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem. Tente novamente mais tarde." },
      { status: 502 }
    );
  }
}
