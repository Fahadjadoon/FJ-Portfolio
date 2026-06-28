import "./globals.css";
import GridCanvas from "@/components/GridCanvas"; // Adjust path if needed

export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white antialiased text-black relative min-h-screen selection:bg-purple-100/80">
        {/* Global Interactive Background Layer */}
        <GridCanvas />

        {/* Global Navigation Layout Container */}
        <main className="relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}