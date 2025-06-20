import type { Metadata } from "next";
import { CivicAuthProvider } from "@civic/auth/nextjs";


export const metadata: Metadata = {
  title: "SignIn | LokAwaaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <CivicAuthProvider>
          {children}
        </CivicAuthProvider></>;
}