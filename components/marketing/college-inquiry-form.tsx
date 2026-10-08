"use client";

import { useState } from "react";
import { toast } from "sonner";

const inputClass =
  "mt-2 w-full min-h-[48px] rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-400/70";

const ROLES = [
  "TPO / Placement cell",
  "Faculty / HOD",
  "Student club lead",
  "College admin",
  "Other",
];

export default function CollegeInquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [role, setRole] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [preferredDates, setPreferredDates] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        college,
        role,
        student_count: studentCount,
        preferred_dates: preferredDates,
        phone,
        notes,
      }),
    });
    setLoading(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast.error(typeof data.error === "string" ? data.error : "Could not send inquiry.");
      return;
    }
    setSubmitted(true);
    toast.success("Inquiry received. We will reply with dates and a quote.");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center md:p-8">
        <h3 className="text-xl font-black text-emerald-200">Inquiry sent</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          We will follow up with format, dates, and a flat workshop fee for your college.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">Name</span>
        <input
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">Work email</span>
        <input
          required
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">College</span>
        <input
          required
          autoComplete="organization"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">Role</span>
        <select
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
        >
          <option value="">Select…</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">Number of students</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={10000}
          value={studentCount}
          onChange={(e) => setStudentCount(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">Preferred dates</span>
        <input
          value={preferredDates}
          onChange={(e) => setPreferredDates(e.target.value)}
          placeholder="e.g. last week of October"
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">Phone (optional)</span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">Notes (optional)</span>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass} min-h-[96px] resize-y`}
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="btn-home-cta min-h-[48px] w-full text-center disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
