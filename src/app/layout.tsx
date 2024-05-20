import "mapbox-gl/dist/mapbox-gl.css";
import "~/css/globals.css";

import { type PropsWithChildren } from "react";
import { type Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Weatherboop",
  description: "Get realtime weather data by clicking on a map!",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${roboto.className} antialiased`}>
          <main className="min-h-screen">{children}</main>
        </body>
      </ClerkProvider>
    </html>
  );
}
