"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit booking.");
      }

      setStatus(result.message);
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="card grid gap-4 p-5 md:grid-cols-2 md:p-7"
    >
      {/* Name */}
      <label className="grid gap-2 text-sm font-semibold">
        Name
        <input
          required
          name="name"
          className="field"
          placeholder="Your name"
        />
      </label>

      {/* Phone */}
      <label className="grid gap-2 text-sm font-semibold">
        Phone
        <input
          required
          name="phone"
          className="field"
          placeholder="+91..."
        />
      </label>

      {/* Truck Number */}
      <label className="grid gap-2 text-sm font-semibold">
        Truck Number
        <input
          required
          name="truckNumber"
          className="field"
          placeholder="UP32 AB 1234"
        />
      </label>

      {/* Truck Type */}
      <label className="grid gap-2 text-sm font-semibold">
        Truck Type
        <input
          name="truckType"
          className="field"
          placeholder="Truck / Trailer / Bus"
        />
      </label>

      {/* Service */}
      <label className="grid gap-2 text-sm font-semibold">
        Service
        <select required name="service" className="field">
          <option value="">Select service</option>
          <option>Engine Repair</option>
          <option>Brake Service</option>
          <option>Suspension Repair</option>
          <option>Oil Change & Greasing</option>
          <option>Radiator Service</option>
          <option>General Maintenance</option>
        </select>
      </label>

      {/* Preferred Time */}
      <label className="grid gap-2 text-sm font-semibold">
        Preferred time
        <select required name="preferredTime" className="field">
          <option value="">Select time</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </label>

      {/* Preferred Date */}
      <label className="grid gap-2 text-sm font-semibold">
        Preferred date
        <input
          required
          type="date"
          name="preferredDate"
          className="field"
        />
      </label>

      {/* Problem */}
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">
        Problem / requirement
        <textarea
          name="problem"
          rows={4}
          className="field py-3"
          placeholder="Tell us what your truck needs..."
        />
      </label>

      {/* Submit */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full sm:w-auto"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}

          {loading ? "Submitting..." : "Request Service"}
        </button>

        {status && (
          <p role="status" className="text-sm text-white/70">
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
