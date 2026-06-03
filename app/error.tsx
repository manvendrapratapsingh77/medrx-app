"use client";
// app/error.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  // Log the error for debugging (could be sent to a monitoring service)
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-off-white flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h1>
          <p className="mb-4 text-gray-700">{error.message}</p>
          <button
            onClick={() => {
              reset();
              // Optionally navigate to home
              // useRouter().push("/");
            }}
            className="rounded bg-primary px-4 py-2 font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
