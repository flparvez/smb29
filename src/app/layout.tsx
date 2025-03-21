import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";

// ✅ Fetch settings from API on the server side
const fetchSettings = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/setting`, {
      cache: "no-store", // Ensure we always get fresh data
    });

    if (!res.ok) throw new Error("Failed to fetch settings");
    return res.json();
  } catch (error) {
    console.error("Error loading settings:", error);
    return {
      title: "SMB29 PTC SITE",
      description: "SMB29 - Best PTC Site In Bangladesh",
    }; // Fallback data
  }
};

// 🎯 Dynamically load metadata based on fetched settings
export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();

  return {
    title: {
      template: `%s - ${settings?.title || "SMB29"}`,
      default: settings?.title || "SMB29 PTC SITE",
    },
    description: settings?.description || "SMB29 - Best PTC Site In Bangladesh",
    keywords: ["SMB29", "ptc site bd", "smb29 ptc"],
    verification: {
      other: {
        "google-site-verification": "ZEjE-cLJCoXI1DyyLXq-ErqHg540Nq9mlZO3cq1A2Bs",
      },
    },
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={settings.logo || "/default-logo.png"} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
