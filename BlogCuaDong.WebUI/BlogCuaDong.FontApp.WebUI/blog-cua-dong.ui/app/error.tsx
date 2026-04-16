"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Unhandled UI error", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.14em] text-slate-500">
          Something went wrong
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          We hit an unexpected error
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Please try again. If the issue continues, check server logs for more
          details.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
