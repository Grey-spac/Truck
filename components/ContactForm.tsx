"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send message.");
      setStatus(result.message);
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-5 md:p-7">
      <label className="grid gap-2 text-sm font-semibold">Name<input required name="name" className="field" placeholder="Your name" /></label>
      <label className="grid gap-2 text-sm font-semibold">Phone<input required name="phone" className="field" placeholder="+91..." /></label>
      <label className="grid gap-2 text-sm font-semibold">Email<input type="email" name="email" className="field" placeholder="you@example.com" /></label>
      <label className="grid gap-2 text-sm font-semibold">Message<textarea required name="message" rows={6} className="field py-3" placeholder="How can we help?" /></label>
      <button disabled={loading} className="btn btn-primary w-full sm:w-fit">{loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} {loading ? "Sending..." : "Send Enquiry"}</button>
      {status && <p role="status" className="text-sm text-white/70">{status}</p>}
    </form>
  );
}
