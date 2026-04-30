import Link from "next/link";
import { cookies } from "next/headers";

export default function Navbar() {
  const isLoggedIn = Boolean(cookies().get("user_id")?.value);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-slate-200">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2 text-slate-900 font-semibold">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand-600 text-white text-sm">
            P
          </span>
          PaperWorks
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <Link href="/#features" className="hover:text-slate-900">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-slate-900">
            Pricing
          </Link>
          {isLoggedIn ? (
            <Link href="/dashboard" className="hover:text-slate-900">
              Dashboard
            </Link>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                Dashboard
              </Link>
              <form action="/api/logout" method="post">
                <button
                  type="submit"
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                Sign in
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
