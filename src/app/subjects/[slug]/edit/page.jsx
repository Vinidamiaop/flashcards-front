"use client"
import {getQuestionsBySubjectId} from "@/api/Questions";
import {toast} from "react-toastify";
import {getSubjectById, updateSubject} from "@/api/Subjects";
import SubjectForm from "@/components/SubjectForm";
import React, {useEffect, useReducer, useState} from "react";
import Loading from "@/components/Loading";
import {useRouter} from "next/navigation";
import validateSubjectForm, {cleanDataBeforeSubmit, nextStep, previusStep} from "@/Utils/SubjectFormUtils";
import Button from "@/components/FormComponents/Button";
import Link from "next/link";
import {IoMdArrowBack} from "react-icons/io";
import {IoHome} from "react-icons/io5";
import Stepper from "@/components/Stepper";
import QuestionsForm from "@/components/QuestionsForm";
import {SubjectReducer} from "@/Reducers/SubjectReducer";

async function getQuestions(id) {
    try {
        return await getQuestionsBySubjectId(id);
    } catch (e) {
        toast.error("Error ao buscar dados");
    }
}

async function getSubject(subjectId) {
    try {
        return await getSubjectById(subjectId);
    } catch (e) {
        toast.error("Error ao buscar dados");
    }
}

async function getData(slug, dispatch) {
    const questions = await getQuestions(slug);
    let subject = null;
    if (questions?.data?.length > 0) {
        subject = await getSubject(questions.data[0].subjectId);
    }

    const subjectData = {
        subjectId: subject?.data?.id,
        title: subject?.data?.title,
        description: subject?.data?.description,
        questions: initData(questions.data),
        deletedQuestions: [],
        deletedAnswers: []
    }

    // setData(() => (subjectData))
    dispatch({type: 'SET_INITIAL_DATA', payload: subjectData});
}

function initData(data) {
    return data.map((value, index) => {
        Object.keys(value).forEach(item => {
            if (item?.toLowerCase() === 'id') {
                value.randomIndex = value[item];
            }
            if (Array.isArray(value[item])) {
                initData(value[item]);
            }
        });
        return value;
    })
}

export default function SubjectEdit({params}) {
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
        {id: 1, label: "Editar assunto", active: true, completed: false, stepIsValid: validateSubjectForm},
        {id: 2, label: "Editar questões", active: false, completed: false},
    ]);

    useEffect(() => {
        getData(params.slug, dispatch);
    }, [params.slug]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const validData = cleanDataBeforeSubmit(state);
            await updateSubject(validData);
            toast.success("Assunto atualizado com sucesso")
            router.push('/');
        } catch (e) {
            toast.error("Erro ao atualizar assunto");
            setErrors(e?.data?.errors);
        }
    }

    if (!state.subjectId) {
        return <Loading/>
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
                        <Button className="bg-purple-700 hover:bg-purple-800"
                                onClick={() => previusStep(state, steps, setSteps, setErrors)} text="Voltar"/>
                        <Button onClick={handleSubmit} text="Salvar"/>
                    </div>}
            </div>
        </div>
    )
}
