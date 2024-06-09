import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { UserProvider, UserConsumer } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UNIST SpaceShare",
  description: "공간 공유 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <>
            <NavBar/>
            {children}
          </>
        </UserProvider>
      </body>
    </html>
  );
};
