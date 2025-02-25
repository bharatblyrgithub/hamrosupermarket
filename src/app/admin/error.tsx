'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Admin Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">500</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Something went wrong!
              </h1>
              <p className="mt-1 text-base text-gray-500">
                {error.message || 'An unexpected error occurred.'}
              </p>
              {error.digest && (
                <p className="mt-1 text-sm text-gray-400">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Try again
              </button>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </main>

        {/* Technical Details (only shown in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Technical Details
            </h2>
            <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm text-gray-700">
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
