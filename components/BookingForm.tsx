"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDateForInput(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateForDisplay(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();

  return Array.from({ length: 42 }, (_, index) => {
    const dayIndex = index - startOffset + 1;
    if (dayIndex < 1) return { date: new Date(year, month - 1, previousMonthDays + dayIndex), currentMonth: false };
    if (dayIndex > daysInMonth) return { date: new Date(year, month + 1, dayIndex - daysInMonth), currentMonth: false };
    return { date: new Date(year, month, dayIndex), currentMonth: true };
  });
}

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const calendarRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => startOfDay(new Date()), []);
  const calendarDays = useMemo(() => getCalendarDays(calendarMonth), [calendarMonth]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function selectDate(date: Date) {
    if (startOfDay(date) < today) return;
    setSelectedDate(formatDateForInput(date));
    setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setCalendarOpen(false);
  }

  function goToPreviousMonth() {
    const previous = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (previous < currentMonthStart) return;
    setCalendarMonth(previous);
  }

  function goToNextMonth() {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  }

  function goToToday() {
    setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(formatDateForInput(today));
    setCalendarOpen(false);
  }

  function clearDate() {
    setSelectedDate("");
  }

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
      setSelectedDate("");
      setCalendarOpen(false);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-5 md:grid-cols-2 md:p-7">
      <label className="grid gap-2 text-sm font-semibold">
        Name
        <input required name="name" className="field" placeholder="Your name" />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Phone
        <input required name="phone" className="field" placeholder="+91..." />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Truck Number
        <input required name="truckNumber" className="field" placeholder="UP32 AB 1234" />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Truck Type
        <input name="truckType" className="field" placeholder="Truck / Trailer / Bus" />
      </label>

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

      <label className="grid gap-2 text-sm font-semibold">
        Preferred time
        <select required name="preferredTime" className="field">
          <option value="">Select time</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </label>

      <div className="grid gap-2 text-sm font-semibold">
        <span>Preferred date</span>

        <div ref={calendarRef} className="booking-date-picker">
          <input type="hidden" name="preferredDate" value={selectedDate} required readOnly />

          <button
            type="button"
            className="booking-date-trigger"
            onClick={() => setCalendarOpen((open) => !open)}
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
          >
            <span className={selectedDate ? "date-value" : "date-placeholder"}>
              {selectedDate ? formatDateForDisplay(selectedDate) : "dd-mm-yyyy"}
            </span>
            <CalendarDays size={18} aria-hidden="true" />
          </button>

          {calendarOpen && (
            <div className="booking-calendar" role="dialog" aria-label="Select preferred date">
              <div className="booking-calendar-header">
                <div className="booking-calendar-month">
                  {calendarMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                </div>

                <div className="booking-calendar-nav">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    disabled={calendarMonth.getFullYear() === today.getFullYear() && calendarMonth.getMonth() === today.getMonth()}
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button type="button" onClick={goToNextMonth} aria-label="Next month">
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>

              <div className="booking-calendar-weekdays">
                {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
              </div>

              <div className="booking-calendar-days">
                {calendarDays.map(({ date, currentMonth }, index) => {
                  const isPast = startOfDay(date) < today;
                  const isToday = isSameDay(date, today);
                  const isSelected = selectedDate === formatDateForInput(date);

                  return (
                    <button
                      key={`${date.getTime()}-${index}`}
                      type="button"
                      disabled={isPast}
                      className={[
                        "booking-calendar-day",
                        !currentMonth ? "is-other-month" : "",
                        isToday ? "is-today" : "",
                        isSelected ? "is-selected" : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => selectDate(date)}
                      aria-label={date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      aria-pressed={isSelected}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="booking-calendar-footer">
                <button type="button" onClick={clearDate}>Clear</button>
                <button type="button" className="today-action" onClick={goToToday}>Today</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <label className="grid gap-2 text-sm font-semibold md:col-span-2">
        Problem / requirement
        <textarea name="problem" rows={4} className="field py-3" placeholder="Tell us what your truck needs..." />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-2">
        <button type="submit" disabled={loading} className="btn btn-primary w-full sm:w-auto">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
          {loading ? "Submitting..." : "Request Service"}
        </button>

        {status && <p role="status" className="text-sm text-white/70">{status}</p>}
      </div>
    </form>
  );
}
