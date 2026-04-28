import { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ANTIGRAVITY APEX — Elite Digital OS",
  description:
    "High-performance digital engineering and immersive editorial systems. Built for the ambitious operator.",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#f8f7f2",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="apex-paper-texture" aria-hidden />
        {children}
        {process.env.NODE_ENV === "development" && (
          <>
            <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
            <script src="https://situ.design/inspector/situImport.bundle.js" async />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    function initInspector() {
                      if (typeof window.installReactClickInspector === 'function') {
                        window.installReactClickInspector();
                        return true;
                      } else if (window.SituInspector && typeof window.SituInspector.initialize === 'function') {
                        window.SituInspector.initialize();
                        return true;
                      }
                      return false;
                    }
                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', function() {
                        if (!initInspector()) {
                          let attempts = 0;
                          const retry = setInterval(function() {
                            if (initInspector() || ++attempts >= 20) clearInterval(retry);
                          }, 100);
                        }
                      });
                    } else {
                      if (!initInspector()) {
                        let attempts = 0;
                        const retry = setInterval(function() {
                          if (initInspector() || ++attempts >= 20) clearInterval(retry);
                        }, 100);
                      }
                    }
                  })();
                `,
              }}
            />
          </>
        )}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
