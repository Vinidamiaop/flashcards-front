"use client"
import Button from "@/components/FormComponents/Button";
import {useState} from "react";
import Modal from "@/components/Modal";
import {IoWarning} from "react-icons/io5";
import Loading from "@/components/Loading";
import {getQuestionsCorrection} from "@/api/Questions";
import CorrectedQuestions from "@/components/CorrectedQuestions";

export default function StudyActivite({data, slug}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [correctedQuestions, setCorrectedQuestions] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        title: '',
        message: '',
        icon: null,
    })
    const [loadingSave, setLoadingSave] = useState(false);
    const total = data?.length;

    function handleAnswerChange(e, answerId) {
        // Cria uma cópia rasa da questão atual
        let question = {...data[currentQuestion]};
        const questionSaved = answers.find(item => item?.id === question.id);

        if (questionSaved) {
            question.answers = questionSaved.answers.map(item => ({...item}));
        } else {
            question.answers = question.answers.map(item => ({...item}));
        }

        // Atualiza a resposta selecionada
        question.answers = question.answers.map(item =>
            item.id === answerId ? {...item, isChecked: !item.isChecked} : item
        );

        // Atualiza o estado das respostas
        setAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(item => item?.id === question.id);
            const newAnswers = [...prevAnswers];

            if (existingAnswerIndex !== -1) {
                newAnswers[existingAnswerIndex] = question;
            } else {
                newAnswers.push(question);
            }

            return newAnswers;
        });
    }

    function isAnswerChecked(questionId, answerId) {
        if (answers.length <= 0) return false;
        const question = answers.find(item => item?.id === questionId);

        if (question?.answers?.length <= 0) return false;
        return question?.answers.filter(item => item?.id === answerId && item?.isChecked).length > 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoadingSave(true);
            const respostasTradatas = answers.map(item => {
                item.answers = item.answers.map(answer => {
                    if(! answer?.isChecked) answer.isChecked = false;
                    return answer;
                });
                return item;
            })
            const response = await getQuestionsCorrection(respostasTradatas)
            setCorrectedQuestions(() => ({...response.data}));
        } catch (e) {
            //
        } finally {
            setLoadingSave(false);
            setShowModal(false)
        }

    }

    function validadeQuestions() {
        let notAnswered = 0;
        if (answers.length !== total) notAnswered = total - answers.length
        answers?.forEach((item) => {
            const isCheckedAnswers = item.answers.filter(answer => answer.isChecked === 1);
            if (isCheckedAnswers.length === 0) {
                notAnswered++
            }
        })
        if (notAnswered > 0) {
            setModalData({
                icon: <IoWarning className="text-6xl text-amber-500"/>,
                title: "Confirmação de envio",
                message: `Você ainda não respondeu ${notAnswered}  de um total de ${total > 1 ? `${total} questões` : `${total} questão`}.
                Tem certeza de que deseja enviar suas respostas assim mesmo?`
            })
            setShowModal(true);
        } else {
            setModalData({
                icon: <IoWarning className="text-6xl text-amber-500"/>,
                title: "Confirmação de envio",
                message: `Todas as questões foram respondidas. Deseja salvar suas respostas agora?
                            Se preferir, você pode revisar suas respostas para assegurar que estão corretas.`
            })
            setShowModal(true);
        }
    }


    if(correctedQuestions) {
        return <CorrectedQuestions data={correctedQuestions} setCorrectedQuestions={setCorrectedQuestions} slug={slug} />
    }

    return (
        <div
            className="flex flex-col justify-center items-center gap-4 p-6 min-h-80 bg-indigo-700 text-gray-100 rounded-lg animate-slideRight">
            {showModal && <Modal className="gap-4" onClose={() => setShowModal(false)}>
                {modalData?.icon}
                <h2 className="text-xl text-center">{modalData?.title}</h2>
                <p className="text-center">{modalData?.message}</p>
                <div className="flex gap-2">
                    <Button className="bg-red-600 hover:bg-red-700" text={"Cancelar Envio"}
                            onClick={() => setShowModal(false)}/>
                    <Button text={"Salvar Respostas"}
                            className="flex items-center gap-2"
                            onClick={handleSubmit}
                            icon={<Loading loading={loadingSave}
                                           classNames="fill-gray-100 w-6 h-6 text-transparent dark:text-transparent"/>}/>
                </div>
            </Modal>}
            {total > 0 &&
                <div className="flex flex-col w-2/3">
                    <div
                        className="absolute top-4 left-4 flex items-center justify-center size-6 bg-gray-100 dark:bg-gray-900 text-violet-700 dark:text-violet-50 rounded-full">
                        {currentQuestion + 1}
                    </div>
                    <h2 className="text-xl my-4">{data[currentQuestion].text}</h2>
                    <div className="flex flex-col items-start justify-start w-full gap-2 rounded">
                        {data[currentQuestion].answers.map(answer => {
                            return (
                                <button
                                    onClick={(e) => handleAnswerChange(e, answer.id)}
                                    className={`bg-gray-900 w-full text-left hover:bg-lime-600 
                                    hover:translate-x-1 transition ease-in-out p-2 
                                    rounded-lg ${isAnswerChecked(data[currentQuestion].id, answer.id) ? 'bg-green-600' : ''}`}
                                    key={answer.id}>{answer.text}</button>
                            )
                        })}
                    </div>
                </div>
            }

            {!total && <div><h2>Nenhuma questão encontrada</h2></div>}
            <div className="flex items-center gap-2 justify-between">
                {currentQuestion > 0 &&
                    <Button onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            className="bg-violet-700 hover:bg-violet-800" text="Voltar"/>}
                {currentQuestion < total - 1 &&
                    <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} text="Próximo"/>}
                {currentQuestion === total - 1 &&
                    <Button onClick={validadeQuestions} text="Salvar"/>}
            </div>
        </div>
    )
}
