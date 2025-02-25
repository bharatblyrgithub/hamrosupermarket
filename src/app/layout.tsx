import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { Providers } from "../providers/Providers";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hamro Supermarket",
  description: "Your one-stop shop for all your grocery needs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
