import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'easymde/dist/easymde.min.css';
import { Toaster } from "@/components/ui/toaster";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const workSans = localFont({
  src: [
    {
     path: './assets/fonts/WorkSans-Black.ttf',
     weight:"900",
     style:"normal",
    },
    {
      path: './assets/fonts/WorkSans-ExtraBold.ttf',
      weight:"800",
      style:"normal",
     },
     {
      path: './assets/fonts/WorkSans-Bold.ttf',
      weight:"700",
      style:"normal",
     },
     {
      path: './assets/fonts/WorkSans-SemiBold.ttf',
      weight:"600",
      style:"normal",
     },
     {
      path: './assets/fonts/WorkSans-Medium.ttf',
      weight:"500",
      style:"normal",
     },
     {
      path: './assets/fonts/WorkSans-Regular.ttf',
      weight:"400",
      style:"normal",
     },
     {
      path: './assets/fonts/WorkSans-Thin.ttf',
      weight:"200",
      style:"normal",
     },
     {
      path: './assets/fonts/WorkSans-ExtraLight.ttf',
      weight:"100",
      style:"normal",
     },
  ],
  variable: '--font-work-sans'
})

export const metadata: Metadata = {
  title: "Startup Tracker",
  description: "Track the newly created startups in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
