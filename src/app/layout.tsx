import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/providers/Providers";
import Navbar from "@/components/sections/Navbar";

import { ReactNode } from "react";
import {
  getCurrentUser,
  isUserAuthenticated,
} from "@/lib/firebase/firebase-admin";

export const metadata: Metadata = {
  title: "Geotera",
  description: "a company engaged in the environmental sector",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  const isAuth = await isUserAuthenticated();
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#2FBC9B" />
        <Providers
          authProps={{ user: JSON.parse(JSON.stringify(user)), isAuth }}
        >
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
