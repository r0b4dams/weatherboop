import { type PropsWithChildren } from "react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weatherboop",
  description: "Get realtime weather data by clicking on a map!",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
