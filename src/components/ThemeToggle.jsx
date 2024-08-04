"use client"

import {useEffect, useState} from "react";
import {FaSun} from "react-icons/fa";
import {BsMoonStarsFill} from "react-icons/bs";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme && theme === "dark") setDarkMode(true);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode])

    return (
        <button onClick={() => setDarkMode(!darkMode)} className="flex justify-center items-center size-6 rounded-full ">
            <span className="z-10 pointer-events-none">{darkMode ? <span className="text-amber-600"><FaSun/></span> : <span className="text-gray-900"><BsMoonStarsFill/></span>}</span>
                <span className="absolute inline-flex size-8 rounded-full bg-amber-500 dark:bg-gray-800 hover:scale-110 transition duration-300 ease-in-out"></span>
        </button>
    );
}
