import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Name, phone and message are required." }, { status: 400 });
    }

    await query(
      `INSERT INTO contacts (name, phone, email, message) VALUES ($1, $2, $3, $4)`,
      [name, phone, email || null, message]
    );

    return NextResponse.json({ message: "Enquiry received successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "The enquiry could not be saved. Please call or WhatsApp us directly." },
      { status: 503 }
    );
  }
}
