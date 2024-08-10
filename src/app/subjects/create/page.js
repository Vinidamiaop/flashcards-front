"use client"

import {IoHome} from "react-icons/io5";
import {IoMdArrowBack} from "react-icons/io";
import Link from "next/link";
import React, {useState} from "react";
import {createSubject} from "@/api/Subjects";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Stepper from "@/components/Stepper";
import SubjectForm from "@/components/SubjectForm";
import QuestionsForm from "@/components/QuestionsForm";
import Button from "@/components/FormComponents/Button";

export default function CreateSubject() {
    const [data, setData] = useState({
        title: '',
        description: '',
        questions: []
    });

    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const [steps, setSteps] = useState([
        {id: 1, label: "Criar assunto", active: true, completed: false, stepIsValid: validateSubjectForm},
        {id: 2, label: "Adicionar questões", active: false, completed: false},
    ]);

    function nextStep() {
        let nextActiveIndex = null;
        const currentActiveStep = steps.find(item => item.active);
        if (currentActiveStep.stepIsValid != null && !currentActiveStep.stepIsValid(data)) {
            return;
        }
        const currentStep = steps.map((step, index) => {
            if (step.active) {
                step.active = false;
                step.completed = true;
                nextActiveIndex = ++index;
            } else if (nextActiveIndex && nextActiveIndex === index) {
                step.active = true;
            }

            return step;
        })
        setSteps(() => currentStep);
    }

    function validateSubjectForm(data) {
        const errorList = [];

        if (data.title.length <= 0) {
            errorList.push("Título é obrigatório");
        }

        if (data.description.length > 255) {
            errorList.push("A descrição deve ter no máximo 255 caracteres.");
        }

        setErrors(errorList);

        return errorList.length <= 0;
    }


    function previusStep() {
        let nextActiveIndex = null;
        const currentStepIndex = steps.findIndex(item => item.active);
        const currentStep = steps.map((step, index) => {
            if (currentStepIndex === index) {
                step.active = false;
                step.completed = false;
            } else if (currentStepIndex === index + 1) {
                step.active = true;
                step.completed = false;
            }

            return step;
        })
        setSteps(() => currentStep);
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    function cleanDataBeforeSubmit(data) {
        const validQuestions = data.questions.filter((item) => {
            const isValidQuestion = item.text.length > 0 && item.answers.length > 0
            const hasValidAnswer = item.answers.filter(answer => answer.text.length > 0).length > 0;

            return isValidQuestion && hasValidAnswer;
        });
        const validData = data;
        validData.questions = validQuestions;

        return validData;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const validData = cleanDataBeforeSubmit(data);
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
                <SubjectForm errors={errors} data={data} handleChange={handleChange}/>}
            {steps[1].active &&
                <QuestionsForm data={data} setData={setData}/>}

            <div className="flex justify-end mt-12 w-full">
                {steps[0].active
                    ? <div><Button onClick={nextStep} text="Próximo"/></div>
                    :
                    <div className="flex items-center gap-2">
                        <Button className="bg-purple-700 hover:bg-purple-800" onClick={previusStep} text="Voltar"/>
                        <Button onClick={handleSubmit} text="Salvar"/>
                    </div>}
            </div>
        </div>
    )
}
