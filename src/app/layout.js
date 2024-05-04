import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/app/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AUTOLAND",
  description: "Import samochodów z UE, USA i Japoni",
};

export default function RootLayout({ children }) {
  return (
      <html lang="pl" className={inter.className}>
      <body>
          <AuthProvider>
              <main>
                  {children}
              </main>
          </AuthProvider>
      </body>
      </html>
  );
}
