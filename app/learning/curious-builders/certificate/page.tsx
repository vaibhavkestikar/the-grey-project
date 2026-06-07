"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import CertificateNameForm from "@/components/learning/certificate-name-form";
import CompletionCertificate, {
  type CertificateData,
} from "@/components/learning/completion-certificate";
import SiteNavbar from "@/components/marketing/site-navbar";
import { CURIOUS_BUILDERS_PATH } from "@/data/curious-builders-path";
import { createClient } from "@/lib/supabase/client";

export default function CuriousBuildersCertificatePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [eligible, setEligible] = useState(false);
  const [defaultFirstName, setDefaultFirstName] = useState("");
  const [defaultLastName, setDefaultLastName] = useState("");
  const [completedLessons, setCompletedLessons] = useState(0);
  const [lessonCount, setLessonCount] = useState(
    CURIOUS_BUILDERS_PATH.lessonCount
  );

  useEffect(() => {
    void (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace(
          `/login?next=${encodeURIComponent("/learning/curious-builders/certificate")}`
        );
        return;
      }

      const listRes = await fetch("/api/certificate/list");
      const listData = await listRes.json().catch(() => ({ certificates: [] }));
      const pathCert = (listData.certificates ?? []).find(
        (cert: { pathId: string }) =>
          cert.pathId === CURIOUS_BUILDERS_PATH.id
      );

      if (pathCert) {
        setCompletedLessons(pathCert.completedLessons ?? 0);
        setLessonCount(pathCert.lessonCount ?? CURIOUS_BUILDERS_PATH.lessonCount);
        setEligible(pathCert.eligible === true);
        setDefaultFirstName(pathCert.firstName ?? "");
        setDefaultLastName(pathCert.lastName ?? "");

        if (pathCert.issued && pathCert.recipientName) {
          setCertificate({
            recipientName: pathCert.recipientName,
            pathTitle: pathCert.pathTitle,
            pathDescription: pathCert.pathDescription,
            completedAt: pathCert.completedAt ?? new Date().toISOString(),
          });
        }
      }

      setReady(true);
    })();
  }, [router]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <p className="text-slate-600">Loading certificate...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <SiteNavbar />
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <Link
          href="/learning/curious-builders"
          className="text-sm font-medium text-slate-500 hover:text-violet-600"
        >
          ← Learning path
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-violet-600">
          Completion certificate
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
          {CURIOUS_BUILDERS_PATH.title}
        </h1>
        <p className="mt-3 text-slate-600">
          Your certificate for finishing this learning path.
        </p>

        <div className="premium-card mt-8 p-6 md:p-8">
          {certificate ? (
            <CompletionCertificate data={certificate} />
          ) : eligible ? (
            <>
              <h2 className="text-xl font-black text-slate-950">
                Generate your certificate
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter your name exactly as you want it printed on the certificate.
              </p>
              <CertificateNameForm
                pathId={CURIOUS_BUILDERS_PATH.id}
                defaultFirstName={defaultFirstName}
                defaultLastName={defaultLastName}
                onIssued={(data) => {
                  setCertificate(data);
                  setEligible(false);
                }}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-black text-slate-950">
                Certificate locked
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Complete all {lessonCount} lessons to unlock your certificate.
                You have finished {completedLessons} so far.
              </p>
              <Link
                href="/learning/curious-builders"
                className="mt-6 inline-flex rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white"
              >
                Back to lessons
              </Link>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/account#certifications"
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            All certifications
          </Link>
        </div>
      </div>
    </main>
  );
}
