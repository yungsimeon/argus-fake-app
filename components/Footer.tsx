export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand-600 text-white text-sm">
              P
            </span>
            PaperWorks
          </div>
          <p className="text-slate-500 mt-3 leading-6">
            AI invoices for solo founders.<br />
            Made by tinyhumans, somewhere in Europe.
          </p>
        </div>

        <div>
          <h4 className="text-slate-900 font-medium mb-3">Product</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="/#features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#">About</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-medium mb-3">Legal</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 px-6 py-6 text-center text-xs text-slate-500">
        © 2026 PaperWorks. Demo app — no real invoices were harmed.
      </div>
    </footer>
  );
}
