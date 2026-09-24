import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const truckModel = String(body.truckModel ?? "").trim();
    const partName = String(body.partName ?? "").trim();
    const quantity = Number(body.quantity ?? 1);
    const notes = String(body.notes ?? "").trim();

    if (!name || !phone || !truckModel || !partName || !Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ error: "Please complete all required parts fields." }, { status: 400 });
    }

    await query(
      `INSERT INTO part_requests
       (name, phone, truck_model, part_name, quantity, notes)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [name, phone, truckModel, partName, quantity, notes || null]
    );

    return NextResponse.json({ message: "Parts request received. We will contact you with availability and details." });
  } catch (error) {
    console.error("Parts API error:", error);
    return NextResponse.json(
      { error: "Parts request could not be saved. Please call or WhatsApp us directly." },
      { status: 503 }
    );
  }
}
