import {Inter, Roboto} from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

const inter = Inter({subsets: ["latin"]});
const roboto = Roboto({subsets: ["latin"], weight: ["300", "400", "500", "900"]})

export const metadata = {
    title: "Flashcards",
    description: "Flashcards study project"
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={roboto.className}>
        <ToastContainer />
        <main className="mx-auto bg-gray-100 text-gray-900 dark:text-gray-100 dark:bg-gray-900 h-screen relative overflow-x-hidden">
            <div className="shadow-lg mb-4 bg-amber-300 dark:bg-gray-900">
                <section className="mx-auto flex w-full justify-between items-center p-4 lg:w-1/2">
                    <Link href="/" className="font-black">Flashcards</Link>
                    <ThemeToggle/>
                </section>
            </div>
            {children}
        </main>

        </body>
        </html>
    );
}
