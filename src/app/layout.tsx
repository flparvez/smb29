import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - SMB29",
    default: "SMB29 PTC SITE",
  },
  description: "SMB29 - Best Ptc Site In Bangladesh",
  keywords:['SMB29','ptc site bd', 'smb29 ptc'],
  verification:{
    other:{
      "google-site-verification": "ZEjE-cLJCoXI1DyyLXq-ErqHg540Nq9mlZO3cq1A2Bs",
     
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Providers>
        {children}
        
        </Providers>
      </body>
    </html>
  );
}
