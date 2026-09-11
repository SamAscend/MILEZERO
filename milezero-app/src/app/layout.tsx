import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MILEZERO — Running Crew",
  description: "MILEZERO is a running crew built around movement, consistency, shared experiences, and continuous progress.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
