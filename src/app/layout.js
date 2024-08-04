import {Inter, Roboto} from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <main className="mx-auto bg-gray-100 text-gray-900 dark:text-gray-100 dark:bg-gray-900 h-screen relative">
            <div className="shadow-lg mb-4 bg-amber-300 dark:bg-gray-900">
                <section className="mx-auto flex w-full justify-between items-center p-4 lg:w-1/2">
                    <h1 className="font-black">Flashcards</h1>
                    <ThemeToggle/>
                </section>
            </div>
            {children}
        </main>

        </body>
        </html>
    );
}
