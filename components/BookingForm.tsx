"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit booking.");
      setStatus(result.message);
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-5 md:grid-cols-2 md:p-7">
      <label className="grid gap-2 text-sm font-semibold">Name<input required name="name" className="field" placeholder="Your name" /></label>
      <label className="grid gap-2 text-sm font-semibold">Phone<input required name="phone" className="field" placeholder="+91..." /></label>
      <label className="grid gap-2 text-sm font-semibold">Truck Number<input required name="truckNumber" className="field" placeholder="UP32 AB 1234" /></label>
      <label className="grid gap-2 text-sm font-semibold">Truck Type<input name="truckType" className="field" placeholder="Truck / Trailer / Bus" /></label>
      <label className="grid gap-2 text-sm font-semibold">Service<select required name="service" className="field"><option value="">Select service</option><option>Engine Repair</option><option>Brake Service</option><option>Suspension Repair</option><option>Oil Change & Greasing</option><option>Radiator Service</option><option>General Maintenance</option></select></label>
      <label className="grid gap-2 text-sm font-semibold">Preferred time<select required name="preferredTime" className="field"><option value="">Select time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
      <label className="grid gap-2 text-sm font-semibold">Preferred date<div className="relative"><CalendarDays size={18} className="pointer-events-none absolute left-3 top-3.5 text-white/40" /><input required type="date" name="preferredDate" className="field pl-10" /></div></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Problem / requirement<textarea name="problem" rows={4} className="field py-3" placeholder="Tell us what your truck needs..." /></label>
      <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button disabled={loading} className="btn btn-primary w-full sm:w-auto">{loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />} {loading ? "Submitting..." : "Request Service"}</button>
        {status && <p role="status" className="text-sm text-white/70">{status}</p>}
      </div>
    </form>
  );
}
