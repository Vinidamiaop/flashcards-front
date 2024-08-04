import {FaPlay} from "react-icons/fa";

export default function SubjectCard({title, primaryColor = "bg-sky-600", secondaryColor = "bg-sky-900"}) {
    return (
        <div className={`flex items-center justify-between gap-4 min-w-90 shadow p-4 ${primaryColor} rounded-lg w-full hover:translate-x-2 transition ease-in-out duration-300 cursor-pointer`}>
            <div className="flex items-center gap-4">
            <div className={`size-10 ${secondaryColor} rounded`}></div>
            <h2>{title}</h2>
            </div>

            <div className="text-gray-900 dark:text-gray-100">
                <button><FaPlay /></button>
            </div>
        </div>
    )
}
