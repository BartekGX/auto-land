import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/app/Providers";
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AUTOLAND",
  description: "Import samochodów z UE, USA i Japoni",
};

export default function RootLayout({ children }) {
  return (
      <html lang="pl" className={inter.className}>
      <head>
        <Script 
              async 
              src="https://www.googletagmanager.com/gtag/js?id=G-N4GXRJQPNL">
        </Script>
        <Script>
          {'
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N4GXRJQPNL')
          '}
        </Script>
      </head>
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
