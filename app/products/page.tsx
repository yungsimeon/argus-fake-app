export const metadata = {
  title: "PaperWorks — products",
};

export default function ProductsPage() {
  return (
    <main style={{ maxWidth: 720, margin: "80px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: 36, margin: 0 }}>What's coming next</h1>
      <p style={{ color: "#475569", marginTop: 16 }}>
        We're building a few things on top of PaperWorks Pro. None of these are
        live yet — sign up to be notified when they ship.
      </p>

      <ul style={{ marginTop: 32, lineHeight: 2 }}>
        <li>
          <strong>Recurring invoices</strong> — set a schedule, walk away.
        </li>
        <li>
          <strong>Multi-currency totals</strong> — auto-convert at the going
          rate.
        </li>
        <li>
          <strong>QuickBooks sync</strong> — push every paid invoice into your
          books on settle.
        </li>
      </ul>
    </main>
  );
}
