"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { downloadCertificatePdf } from "@/lib/certificate/download-certificate-pdf";

export type CertificateData = {
  recipientName: string;
  pathTitle: string;
  pathDescription: string;
  completedAt: string;
};

type Props = {
  data: CertificateData;
  certificateId?: string;
  showDownload?: boolean;
  compact?: boolean;
};

function formatCertificateDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function CompletionCertificate({
  data,
  certificateId = "completion-certificate",
  showDownload = true,
  compact = false,
}: Props) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    try {
      setDownloading(true);
      const safeName = data.pathTitle.replace(/\s+/g, "-").toLowerCase();
      await downloadCertificatePdf(
        certificateId,
        `the-grey-project-${safeName}-certificate.pdf`
      );
      toast.success("Certificate downloaded.");
    } catch (err) {
      console.error(err);
      toast.error("Could not generate PDF. Try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <div
        id={certificateId}
        className="relative overflow-hidden rounded-[1.75rem] border-4 border-violet-200 bg-white p-6 shadow-xl sm:p-8 md:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-blue-50/60" />
        <div className="pointer-events-none absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600" />

        <div className="relative text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-violet-600 sm:text-xs">
            The Grey Project
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-xs">
            Certificate of Completion
          </p>

          <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {data.recipientName}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            has successfully completed the learning path
          </p>

          <p className="mt-4 text-xl font-black text-violet-700 sm:text-2xl md:text-3xl">
            {data.pathTitle}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {data.pathDescription}
          </p>

          <div className="mx-auto mt-8 max-w-md border-t border-violet-100 pt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Date of completion
            </p>
            <p className="mt-2 text-base font-bold text-slate-900 sm:text-lg">
              {formatCertificateDate(data.completedAt)}
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-sm flex-col items-center">
            <Image
              src="/signature.png"
              alt="Vaibhav Kestikar signature"
              width={120}
              height={43}
              className="h-9 w-auto object-contain sm:h-10"
            />
            <div className="mt-3 w-full border-t border-slate-300 pt-3">
              <p className="text-sm font-bold text-slate-900">Vaibhav Kestikar</p>
              <p className="mt-1 text-xs text-slate-600">
                Senior Data Scientist · Founder, The Grey Project
              </p>
            </div>
          </div>
        </div>
      </div>

      {showDownload && (
        <button
          type="button"
          onClick={() => void handleDownload()}
          disabled={downloading}
          className="w-full rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50 sm:w-auto"
        >
          {downloading ? "Preparing PDF..." : "Download certificate (PDF)"}
        </button>
      )}
    </div>
  );
}
