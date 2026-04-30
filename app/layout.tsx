import "./globals.css";
import Script from "next/script";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PaperWorks — AI invoices for tiny businesses",
  description:
    "Generate, export and email invoices in seconds. Built for solo founders.",
};

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1234567890123456";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          The Pixel loader runs on every page so window.fbq is defined,
          but we deliberately do NOT auto-fire PageView here. The only
          Pixel event in this app is Purchase, fired from /order/success
          after a confirmed Stripe checkout.
        */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
        `}</Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
