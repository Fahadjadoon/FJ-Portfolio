import "./globals.css";
import GridCanvas from "@/components/GridCanvas";

// ------------------------------------------------------------------
// SITE METADATA (fixes generic "My Portfolio" title/description)
// ------------------------------------------------------------------
const SITE_URL = "https://fahadjadoon.com"; // <-- change to your real domain
const SITE_NAME = "Fahad Jadoon";
const SITE_TITLE = "Fahad Jadoon — Frontend Engineer (React / Next.js / TypeScript)";
const SITE_DESCRIPTION =
  "Frontend engineer with 3+ years building responsive SaaS platforms and AI-powered products. Case studies in React, Next.js, TypeScript, FastAPI, and PostgreSQL.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Fahad Jadoon",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "FastAPI",
    "SaaS Frontend",
    "AI Product Engineer",
    "Pakistan Frontend Developer",
  ],
  authors: [{ name: "Fahad Jadoon", url: SITE_URL }],
  creator: "Fahad Jadoon",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png", // add a 1200x630 image at /public/og-image.png
        width: 1200,
        height: 630,
        alt: "Fahad Jadoon — Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png", // add a 32x32 or SVG favicon at /public/icon.png
    apple: "/apple-icon.png", // optional 180x180
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ------------------------------------------------------------------
// VIEWPORT (mobile chrome color + proper scaling)
// ------------------------------------------------------------------
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

// ------------------------------------------------------------------
// ROOT LAYOUT
// ------------------------------------------------------------------
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white antialiased text-black relative min-h-screen selection:bg-purple-200/70 selection:text-black">
        {/* Global interactive grid background (behind everything) */}
        <GridCanvas />

        {/* Global content layer sits above the background */}
        <main className="relative z-10 w-full">{children}</main>
      </body>
    </html>
  );
}