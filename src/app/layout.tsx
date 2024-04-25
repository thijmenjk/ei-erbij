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
        
        <script>window.apeeling = { representativeId: "clvf96czg00005b4a2wb6h338", mode: "bubble", baseUri: "https://universe.apeelingai.com", rootElementId: "apeeling-ai-client", }; (function () { d = document; s = d.createElement("script"); s.src = "https://starship.apeelingai.com"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();</script>
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
