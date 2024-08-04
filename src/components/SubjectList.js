"use client"

import SubjectCard from "@/components/SubjectCard";
import {subjects} from "@/api/Subjects";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function SubjectList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const colors = [
        {primaryColor: "bg-green-600", secondaryColor: "bg-green-900"},
        {primaryColor: "bg-amber-600", secondaryColor: "bg-amber-900"},
        {primaryColor: "bg-purple-600", secondaryColor: "bg-purple-900"},
        {primaryColor: "bg-red-600", secondaryColor: "bg-red-900"},
        {primaryColor: "bg-pink-600", secondaryColor: "bg-pink-900"},
        {primaryColor: "bg-lime-600", secondaryColor: "bg-lime-900"},
        {primaryColor: "bg-emerald-600", secondaryColor: "bg-emerald-900"},
    ];
    async function getData() {
        const response = await subjects.get("/subjects");
        setData(response.data);
        setLoading(false)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <section className="mt-4 flex flex-col justify-center items-center gap-2 p-4 ">
            {loading && <div className="size-10 relative">
                <div
                    className="size-7 rounded-full flex justify-center items-center border-t-2 border-pink-700 border-b-0 animate-spin">
                    <div className="size-2 bg-sky-300 rounded-full animate-ping"></div>
                </div>
            </div>}
            {data && data.data.map((item, index) => <div key={item.id} className="animate-slideRight w-full"><SubjectCard
                                                            title={item.title} {...colors[index % colors.length]} /></div>)}
        </section>
    )
}
