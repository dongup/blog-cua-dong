"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  console.error("Root-level app error", error);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.14em] text-slate-500">
            Application error
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            A critical error occurred
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Please refresh the page or try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
