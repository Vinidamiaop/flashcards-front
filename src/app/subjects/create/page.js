"use client"

import {IoHome} from "react-icons/io5";
import {IoMdArrowBack} from "react-icons/io";
import Link from "next/link";
import React, {useReducer, useState} from "react";
import {createSubject} from "@/api/Subjects";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Stepper from "@/components/Stepper";
import SubjectForm from "@/components/SubjectForm";
import QuestionsForm from "@/components/QuestionsForm";
import Button from "@/components/FormComponents/Button";
import validateSubjectForm, {cleanDataBeforeSubmit, nextStep, previusStep} from "@/Utils/SubjectFormUtils";
import {SubjectReducer} from "@/Reducers/SubjectReducer";

export default function CreateSubject() {
    const [state, dispatch] = useReducer(SubjectReducer, {
        subjectId: null,
        title: '',
        description: '',
        questions: [],
        deletedQuestions: [],
        deletedAnswers: []
    });

    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const [steps, setSteps] = useState([
        {id: 1, label: "Criar assunto", active: true, completed: false, stepIsValid: validateSubjectForm},
        {id: 2, label: "Adicionar questões", active: false, completed: false},
    ]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const validData = cleanDataBeforeSubmit(state);
            await createSubject(validData);
            toast.success("Assunto salvo com sucesso")
            router.push('/');
        } catch (e) {
            toast.error("Erro ao salvar assunto");
            setErrors(e?.data?.errors);
        }
    }

    return (
        <div className="mx-auto lg:w-1/2 p-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
                <IoMdArrowBack/>
                <IoHome/>
            </Link>

            <div className="mt-4 mb-8">
                <Stepper steps={steps}/>
            </div>

            {steps[0].active &&
                <SubjectForm errors={errors} state={state} dispatch={dispatch}/>}
            {steps[1].active &&
                <QuestionsForm state={state} dispatch={dispatch}/>}

            <div className="flex justify-end mt-12 w-full">
                {steps[0].active
                    ? <div><Button onClick={() => nextStep(state, steps, setSteps, setErrors)} text="Próximo"/></div>
                    :
                    <div className="flex items-center gap-2">
                        <Button className="bg-purple-700 hover:bg-purple-800" onClick={() => previusStep(state, steps, setSteps, setErrors)} text="Voltar"/>
                        <Button onClick={handleSubmit} text="Salvar"/>
                    </div>}
            </div>
        </div>
    )
}
