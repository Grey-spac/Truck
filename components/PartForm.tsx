"use client";

import { FormEvent, useState } from "react";
import { Loader2, PackageCheck } from "lucide-react";

export default function PartForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit part request.");
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
      <label className="grid gap-2 text-sm font-semibold">Truck model<input required name="truckModel" className="field" placeholder="Truck model / variant" /></label>
      <label className="grid gap-2 text-sm font-semibold">Part name<input required name="partName" className="field" placeholder="e.g. Brake chamber" /></label>
      <label className="grid gap-2 text-sm font-semibold">Quantity<input required min="1" type="number" name="quantity" className="field" defaultValue="1" /></label>
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">Additional details<textarea name="notes" rows={4} className="field py-3" placeholder="Part number, photo reference, urgency, etc." /></label>
      <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button disabled={loading} className="btn btn-primary w-full sm:w-auto">{loading ? <Loader2 className="animate-spin" size={18} /> : <PackageCheck size={18} />} {loading ? "Sending..." : "Request Part"}</button>
        {status && <p role="status" className="text-sm text-white/70">{status}</p>}
      </div>
    </form>
  );
}
