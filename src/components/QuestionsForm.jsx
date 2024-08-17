"use client"
import Input from "@/components/FormComponents/Input";
import Textarea from "@/components/FormComponents/Textarea";
import {IoIosAdd, IoIosTrash} from "react-icons/io";
import React, {useEffect} from "react";

export default function QuestionsForm({state, dispatch}) {

    useEffect(() => {
        if (state.questions.length <= 0) {
            dispatch({type: 'INITIALIZE_QUESTIONS'});
        }
    }, [state.questions.length]);

    function handleAddAnswer(e, questionIndex) {
        e.preventDefault();
        dispatch({type: 'ADD_ANSWER', payload: {questionIndex}});
    }

    function handleAddQuestion(e) {
        e.preventDefault();
        dispatch({type: 'ADD_QUESTION'});
    }

    function handleRemoveAnswer(e, questionIndex, answerIndex) {
        e.preventDefault();
        dispatch({type: 'REMOVE_ANSWER', payload: {questionIndex, answerIndex}});
    }

    function handleRemoveQuestion(e, questionIndex) {
        e.preventDefault();
        dispatch({type: 'REMOVE_QUESTION', payload: {questionIndex}});
    }

    function handleChangeAnswer(e, questionIndex, answerIndex) {
        const key = e.target.id;
        const value = key === "isCorrect" ? e.target.checked : e.target.value;
        dispatch({type: 'CHANGE_ANSWER', payload: {questionIndex, answerIndex, key, value}});
    }

    function handleChangeQuestion(e, questionIndex) {
        dispatch({type: 'CHANGE_QUESTION', payload: {questionIndex, text: e.target.value}});

    }

    return (
        <>
            <form className="flex flex-col gap-4 w-full my-4">
                {state.questions?.length > 0 && state.questions.map((question, index) => {
                    return (
                        <div className={`flex flex-col gap-4 w-full mb-12 relative animate-slideRight`}
                             key={question.randomIndex}>
                            <div
                                className={`flex justify-center items-center size-8 rounded-full bg-emerald-600 absolute -top-4 -left-3`}>
                                {++index}
                            </div>
                            {index > 1 && <button
                                onClick={(e) => handleRemoveQuestion(e, question.randomIndex)}
                                className={`flex justify-center items-center size-8 rounded-full bg-red-600 hover:scale-110 transition ease-in-out absolute top-2 right-2`}>
                                <IoIosTrash/>
                            </button>}
                            <Textarea id="text" rows={4} handleChange={(e) => handleChangeQuestion(e, question.randomIndex)}
                                      defaultValue={question.text} placeholder="Questão"/>

                            <div className={`flex flex-col items-center gap-2`}>
                                {question.answers.map((answer, index) => (
                                    <div key={answer.randomIndex}
                                         className={`flex items-center gap-2 w-full animate-slideRight`}>

                                        <Input id={`text`} value={answer.text} placeholder="Resposta"
                                               className={`flex-grow`}
                                               onChange={(e) => handleChangeAnswer(e, question.randomIndex, answer.randomIndex)}/>

                                        <label><input id={`isCorrect`} type="checkbox" value={answer.isCorrect}
                                                      onChange={(e) => handleChangeAnswer(e, question.randomIndex, answer.randomIndex)}/> Correta</label>

                                        {question.answers?.length === index + 1
                                            ? <button onClick={(e) => handleAddAnswer(e, question.randomIndex, answer.randomIndex)}
                                                      className={`p-2 bg-green-600 rounded`}>
                                                <IoIosAdd/>
                                            </button>
                                            : <button onClick={(e) => handleRemoveAnswer(e, question.randomIndex, answer.randomIndex)}
                                                      data-id-answer={answer.randomIndex}
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
