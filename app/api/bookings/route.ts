import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const truckNumber = String(body.truckNumber ?? "").trim();
    const truckType = String(body.truckType ?? "").trim();
    const service = String(body.service ?? "").trim();
    const preferredDate = String(body.preferredDate ?? "").trim();
    const preferredTime = String(body.preferredTime ?? "").trim();
    const problem = String(body.problem ?? "").trim();

    if (!name || !phone || !truckNumber || !service || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: "Please complete all required booking fields." }, { status: 400 });
    }

    await query(
      `INSERT INTO service_bookings
       (name, phone, truck_number, truck_type, service, preferred_date, preferred_time, problem)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [name, phone, truckNumber, truckType || null, service, preferredDate, preferredTime, problem || null]
    );

    return NextResponse.json({ message: "Service request received. We will contact you to confirm the appointment." });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Booking could not be saved. Please call or WhatsApp us directly." },
      { status: 503 }
    );
  }
}
