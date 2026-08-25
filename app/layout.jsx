import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "G2M - AI-Powered Learning Management System",
  description: "Learn smarter with AI-powered courses, personalized learning paths, and intelligent tutoring.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
