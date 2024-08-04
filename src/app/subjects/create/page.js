"use client"

import {IoHome} from "react-icons/io5";
import {IoMdArrowBack} from "react-icons/io";
import Link from "next/link";
import {useState} from "react";
import {subjects} from "@/api/Subjects";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

export default function CreateSubject() {
    const estiloForm = "p-2 text-gray-900 dark:text-gray-100 focus:outline-none  dark:bg-gray-700  focus:shadow-outline rounded-lg focus:border-indigo-700 dark:focus:border-gray-100 border-2 focus:border-3 border-gray-900"
    const [data, setData] = useState({
        title: '',
        description: ''
    });
    const router = useRouter();
    const [errors, setErrors] = useState([]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        subjects.post('/subjects', data).then(() => {
            toast.success("Assunto salvo com sucesso")
            router.push('/');
        }).catch(e => {
            setErrors(e.response.data.errors);
            toast.error("Erro ao salvar assunto");

        })
    }

    console.log(errors)
    return (
        <div className="mx-auto lg:w-1/2 p-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
                <IoMdArrowBack />
                <IoHome />
            </Link>
            <h1 className="text-lg font-black">Novo assunto</h1>

            <div className="flex flex-col gap-2 my-2 w-full transition ease-in-out text-white">
            {errors?.length > 0 && errors.map(error => <span className="bg-red-500 p-2 rounded block" key={error}>{error}</span>)}
            </div>
            <form className="flex flex-col gap-4 w-full my-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <input id="title" type="text" placeholder="Titulo" className={estiloForm} onChange={handleChange} />
                    <textarea id="description" rows="6" placeholder="Descrição" className={estiloForm} onChange={handleChange} />
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-600 rounded py-2 px-4 hover:bg-green-700 text-white transition ease-in-out">Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
