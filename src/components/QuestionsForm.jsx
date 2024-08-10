"use client"
import Input from "@/components/FormComponents/Input";
import Textarea from "@/components/FormComponents/Textarea";
import {IoIosAdd, IoIosTrash} from "react-icons/io";
import React, {useEffect} from "react";
import Button from "@/components/FormComponents/Button";
import {FaTrash} from "react-icons/fa";

export default function QuestionsForm({data, setData}) {
    const MAX_RANDOM_VALUE = 999;

    useEffect(() => {
        if(data.questions.length <= 0) {
            setData((old) => ({
                ...old,
                questions: [
                    {
                        id: (Math.random() * MAX_RANDOM_VALUE).toFixed(),
                        text: '',
                        answers: [
                            {id: (Math.random() * MAX_RANDOM_VALUE).toFixed(), text: '', isCorrect: false}
                        ]
                    }
                ]
            }))
        }

    }, [setData, data.questions.length]);

    function generateRandomId(questionId = null, isQuestion = false) {
        let randomNumber;
        let currentQuestion;

        if(! isQuestion) {
            currentQuestion = data.questions.filter(item => Number(item.id) === Number(questionId))
        } else {
            currentQuestion = data
        }

        const key = isQuestion ? 'questions' : 'answers'
        if (currentQuestion[key] != null) {
            do {
                randomNumber = (Math.random() * MAX_RANDOM_VALUE).toFixed();
            } while (currentQuestion[key].filter(item => Number(item.id) === Number(randomNumber)).length > 0);
        } else {
            return (Math.random() * MAX_RANDOM_VALUE).toFixed();
        }

        return randomNumber;
    }

    function handleAddAnswer(e, questionId) {
        e.preventDefault();
        const newQuestions = data.questions.map(item => {
            if(item.id === questionId) {
                return {
                    ...item,
                    answers: [...item.answers, {id: generateRandomId(item.id), text: '', isCorrect: false}]
                };
            }
            return item;
        });
        setData(old => ({ ...old, questions: newQuestions }));
    }

    function handleAddQuestion(e) {
        e.preventDefault();
        setData(old => ({ ...old, questions: [...old.questions, {
                id: generateRandomId(null, true),
                text: '',
                answers: [
                    {id: (Math.random() * MAX_RANDOM_VALUE).toFixed(), text: '', isCorrect: false}
                ]
            }] }));
    }

    function handleRemoveAnswer(e, questionId, answerId) {
        e.preventDefault();
        const newQuestions = data.questions.map(item => {
            if(item.id === questionId) {
                return {
                    ...item,
                    answers: item.answers.filter(answer => answer.id !== answerId)
                };
            }
            return item;
        });
        setData(old => ({ ...old, questions: newQuestions }));
    }

    function handleRemoveQuestion(e, questionId) {
        e.preventDefault();
        const newQuestions = data.questions.filter(item => item.id !== questionId)
        setData(old => ({ ...old, questions: newQuestions }));
    }

    function handleChangeAnswer(e, questionId, answerId) {
        const newQuestions = data.questions.map(item => {
            if (item.id === questionId) {
                return {
                    ...item,
                    answers: item.answers.map(answer => {
                        if (answer.id === answerId) {
                            return {
                                ...answer,
                                [e.target.id]: e.target.id === "isCorrect" ? e.target.checked : e.target.value
                            };
                        }
                        return answer;
                    })
                };
            }
            return item;
        });
        setData(old => ({ ...old, questions: newQuestions }));
    }

    function handleChangeQuestion(e, questionId) {
        const newQuestion = data.questions.map(item => {
            if(item.id === questionId) {
                item.text = e.target.value;
            }
            return item;
        })

        setData(old => ({ ...old, questions: newQuestion }));
    }

    return (
        <>
            <form className="flex flex-col gap-4 w-full my-4">
                {data.questions?.length > 0 && data.questions.map((question, index) => {
                    return (
                        <div className={`flex flex-col gap-4 w-full mb-12 relative animate-slideRight`} key={question.id}>
                            <div
                                className={`flex justify-center items-center size-8 rounded-full bg-emerald-600 absolute -top-4 -left-3`}>
                                {++index}
                            </div>
                            {index > 1 && <button
                                onClick={(e) => handleRemoveQuestion(e, question.id)}
                                className={`flex justify-center items-center size-8 rounded-full bg-red-600 hover:scale-110 transition ease-in-out absolute top-2 right-2`}>
                                <IoIosTrash/>
                            </button>}
                            <Textarea id="text" rows={4} handleChange={(e) => handleChangeQuestion(e, question.id)} defaultValue={question.text}  placeholder="Questão"/>

                            <div className={`flex flex-col items-center gap-2`}>
                                {question.answers.map((answer, index) => (
                                    <div key={answer.id}
                                         className={`flex items-center gap-2 w-full animate-slideRight`}>

                                        <Input id={`text`} value={answer.text} placeholder="Resposta" className={`flex-grow`}
                                               onChange={(e) => handleChangeAnswer(e, question.id, answer.id)}/>

                                        <label><input id={`isCorrect`} type="checkbox" value={answer.isCorrect}
                                               onChange={(e) => handleChangeAnswer(e, question.id, answer.id)}/> Correta</label>

                                        {question.answers?.length === index + 1
                                            ? <button onClick={(e) => handleAddAnswer(e, question.id, answer.id)}
                                                      className={`p-2 bg-green-600 rounded`}>
                                                <IoIosAdd/>
                                            </button>
                                            : <button onClick={(e) => handleRemoveAnswer(e, question.id, answer.id)}
                                                      data-id-answer={answer.id}
                                                      className={`p-2 rounded bg-red-600`}><IoIosTrash/></button>
                                        }
                                    </div>

                                ))}
                            </div>

                        </div>
                    )
                })}

                <div className={`mx-auto`}>
                    <button onClick={(e) => handleAddQuestion(e)}
                            className={`flex justify-center text-3xl items-center gap-2 p-2 bg-green-600 rounded-full`}>
                        <IoIosAdd/>
                    </button>
                </div>
            </form>
        </>
    )
}
