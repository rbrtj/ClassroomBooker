import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PK - Zarezerwuj sale",
  description: "Politechnika Krakowska - Rezerwacja sal",
  icons: [{ rel: "icon", url: "/pklogo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#020d6d] to-[#15162c] text-white`}
      >
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
