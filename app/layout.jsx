import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata = {
  title: {
    default: "G2M ECE Hub - AI-Powered Electronics & Communication Engineering Learning",
    template: "%s | G2M ECE Hub",
  },
  description:
    "Master Electronics & Communication Engineering with AI-powered tutoring, smart analytics, and personalized learning paths. Covers signals, circuits, VLSI, embedded systems, communications & more.",
  keywords: [
    "ECE", "electronics and communication engineering", "VLSI", "embedded systems",
    "digital signal processing", "analog circuits", "microcontrollers", "communication systems",
    "AI tutoring", "engineering education", "G2M",
  ],
  openGraph: {
    title: "G2M ECE Hub - AI-Powered Electronics & Communication Engineering Learning",
    description:
      "Master Electronics & Communication Engineering with AI-powered tutoring, smart analytics, and personalized learning paths.",
    type: "website",
    siteName: "G2M ECE Hub",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('g2m_theme')||'light';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
