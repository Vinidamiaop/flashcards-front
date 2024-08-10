"use client"

import SubjectCard from "@/components/SubjectCard";
import {getSubjects} from "@/api/Subjects";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Loading from "@/components/Loading";

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
        try {
            const response = await getSubjects();
            setData(response);
            setLoading(false)
        } catch (e) {
            toast.error(e?.message);
            setLoading(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <section className="mt-4 flex flex-col justify-center items-center gap-2 p-4 text-gray-100">
            {loading && <Loading />}
            {data && data.data.map((item, index) => <div key={item.id} className="animate-slideRight w-full">
                <SubjectCard url={`/subjects/${item.slug}`}
                             title={item.title} {...colors[index % colors.length]} /></div>)}
            {!loading && !data && <p>Nenhum item encontrado</p>}
        </section>
    )
}
