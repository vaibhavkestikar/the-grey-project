"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import CertificateNameForm from "@/components/learning/certificate-name-form";
import CompletionCertificate, {
  type CertificateData,
} from "@/components/learning/completion-certificate";

type CertificateRecord = {
  pathId: string;
  pathTitle: string;
  pathDescription: string;
  lessonCount: number;
  completedLessons: number;
  eligible: boolean;
  issued: boolean;
  recipientName: string | null;
  firstName: string;
  lastName: string;
  completedAt: string | null;
  href: string;
};

type Props = {
  initialCertificates?: CertificateRecord[];
};

export default function ProfileCertifications({
  initialCertificates,
}: Props) {
  const [certificates, setCertificates] = useState<CertificateRecord[]>(
    initialCertificates ?? []
  );
  const [loading, setLoading] = useState(!initialCertificates);

  useEffect(() => {
    if (initialCertificates) return;

    void (async () => {
      const res = await fetch("/api/certificate/list");
      const data = await res.json().catch(() => ({ certificates: [] }));
      if (res.ok) {
        setCertificates(data.certificates ?? []);
      }
      setLoading(false);
    })();
  }, [initialCertificates]);

  function handleIssued(pathId: string, data: CertificateData) {
    setCertificates((prev) =>
      prev.map((cert) =>
        cert.pathId === pathId
          ? {
              ...cert,
              issued: true,
              eligible: true,
              recipientName: data.recipientName,
              completedAt: data.completedAt,
            }
          : cert
      )
    );
  }

  if (loading) {
    return (
      <div className="premium-card mt-8 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-50">Certifications</h2>
        <p className="mt-4 text-sm text-slate-400">Loading certifications...</p>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="premium-card mt-8 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-50">Certifications</h2>
        <p className="mt-3 text-sm text-slate-400">
          Complete a learning path to earn your first certificate.
        </p>
        <Link href="/learning" className="btn-home-cta mt-5 inline-flex px-5 py-3 text-sm">
          Browse learning paths
        </Link>
      </div>
    );
  }

  const issuedCount = certificates.filter((cert) => cert.issued).length;

  return (
    <section id="certifications" className="premium-card mt-8 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-50">Certifications</h2>
          <p className="mt-2 text-sm text-slate-400">
            {issuedCount > 0
              ? `${issuedCount} certificate${issuedCount === 1 ? "" : "s"} earned. Download or share anytime.`
              : "Finish a path and claim your certificate below."}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {certificates.map((cert) => {
          const certificateData: CertificateData | null =
            cert.issued && cert.recipientName
              ? {
                  recipientName: cert.recipientName,
                  pathTitle: cert.pathTitle,
                  pathDescription: cert.pathDescription,
                  completedAt: cert.completedAt ?? new Date().toISOString(),
                }
              : null;

          return (
            <article
              key={cert.pathId}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    Learning path
                  </p>
                  <h3 className="mt-1 text-lg font-black text-slate-50">
                    {cert.pathTitle}
                  </h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    cert.issued
                      ? "border border-cyan-500/30 bg-cyan-500/15 text-cyan-200"
                      : cert.eligible
                        ? "border border-amber-500/30 bg-amber-500/15 text-amber-200"
                        : "border border-slate-600 bg-slate-800 text-slate-300"
                  }`}
                >
                  {cert.issued
                    ? "Completed"
                    : cert.eligible
                      ? "Ready to claim"
                      : `${cert.completedLessons}/${cert.lessonCount} lessons`}
                </span>
              </div>

              {certificateData ? (
                <div className="mt-6">
                  <CompletionCertificate
                    data={certificateData}
                    certificateId={`profile-cert-${cert.pathId}`}
                    compact
                  />
                </div>
              ) : cert.eligible ? (
                <div className="mt-6 rounded-2xl border border-violet-500/25 bg-slate-900/60 p-5">
                  <p className="text-sm text-slate-400">
                    You finished every lesson. Add your name to generate your
                    certificate.
                  </p>
                  <CertificateNameForm
                    pathId={cert.pathId}
                    defaultFirstName={cert.firstName}
                    defaultLastName={cert.lastName}
                    onIssued={(data) => handleIssued(cert.pathId, data)}
                  />
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-600 bg-slate-900/40 p-5">
                  <p className="text-sm text-slate-400">
                    Complete all {cert.lessonCount} lessons to unlock your
                    certificate for this path.
                  </p>
                  <Link
                    href={`/learning/${cert.pathId}`}
                    className="mt-4 inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    Continue learning →
                  </Link>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
