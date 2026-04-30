// Login screen for the demo. Two buttons that POST to a tiny route handler
// which sets the user_id + user_plan cookies. No real auth — this whole app
// is a test fixture. The pattern matters more than the security here.

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-3xl font-semibold">Sign in to PaperWorks</h1>
      <p className="mt-2 text-slate-600">
        This is a demo — pick a plan and we'll fake-log you in.
      </p>

      <form action="/api/login" method="post" className="mt-8 space-y-3">
        <button
          name="plan"
          value="free"
          className="w-full rounded-lg border border-slate-300 hover:border-slate-400 text-slate-900 font-medium px-4 py-3"
        >
          Sign in as <strong>Free</strong>
        </button>
        <button
          name="plan"
          value="pro"
          className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-3"
        >
          Sign in as <strong>Pro</strong>
        </button>
      </form>

      <p className="text-xs text-slate-500 mt-6 text-center">
        In a real app this would be email + magic link.
      </p>
    </section>
  );
}
