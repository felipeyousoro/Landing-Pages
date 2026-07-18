import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 502 }
    );
  }
}
