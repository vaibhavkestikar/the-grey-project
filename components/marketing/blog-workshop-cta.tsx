import Link from "next/link";

import { WORKSHOP_INQUIRY_HREF } from "@/data/workshops";

export default function BlogWorkshopCta() {
  return (
    <div className="mt-16 rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-8 md:p-10">
      <p className="text-sm font-bold uppercase tracking-widest text-violet-600">Workshops</p>
      <h3 className="mt-3 text-2xl font-black text-slate-950">Bring this thinking to campus</h3>
      <p className="mt-3 text-slate-600">
        The Grey Project runs live AI workshops for engineering colleges — industry landscape, then
        a project students can show.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={WORKSHOP_INQUIRY_HREF}
          className="min-h-[48px] rounded-xl bg-violet-600 px-6 py-3 text-center font-semibold text-white"
        >
          Book a workshop
        </Link>
        <Link
          href="/workshops"
          className="min-h-[48px] rounded-xl border border-violet-200 bg-white px-6 py-3 text-center font-semibold text-violet-700"
        >
          See workshops
        </Link>
      </div>
    </div>
  );
}
