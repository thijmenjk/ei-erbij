import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";
export const preferredRegion = ["fra1"];
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ei Erbij?",
  description: "Website voor de belangrijke taak van het bijhouden van eitjes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        {children}

        <footer className="flex p-6 justify-center">
          <a
            href="https://github.com/thijmenjk/ei-erbij"
            className="underline"
            target="_blank"
          >
            source
          </a>
        </footer>
      </body>
    </html>
  );
}
