import "mapbox-gl/dist/mapbox-gl.css";
import "~/css/globals.css";

import { type PropsWithChildren } from "react";
import { type Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/toaster";

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
      <ClerkProvider
        appearance={{
          elements: {
            modalContent: "m-auto",
            userButtonPopoverFooter: "hidden",
          },
        }}
      >
        <body className={`${roboto.className} antialiased`}>
          <main className="flex min-h-screen">{children}</main>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
