import { Noto_Serif_Khojki } from "next/font/google";

import "./globals.css";

const noto = Noto_Serif_Khojki({subsets: ["latin"]});

export const metadata = {
  title: "Memento Mori",
  description: "Remember you must die",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${noto.className} bg-cream`}>{children}{" "}</body>
    </html>
  );
}
