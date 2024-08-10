import QuestionsResultChart from "@/components/charts/QuestionsResultChart";
import Button from "@/components/FormComponents/Button";
import {useRouter} from "next/navigation";

export default function CorrectedQuestions({data, slug, setCorrectedQuestions}) {
    const router = useRouter();

    function questionIsCorrect(questionId) {
        const incorrect = data.incorrect.find(item => item.id === questionId);
        return incorrect?.id != null
    }

    function verifyAnswerCorrect(answer) {
        if (answer.isChecked && answer.isChecked === answer.isCorrect) {
            return 'bg-green-600'
        }
        if (answer.isChecked && answer.isChecked !== answer.isCorrect) {
            return 'bg-red-600'
        }

        return 'bg-gray-800';
    }

    function mountAnswers(answers) {
        return (
            <div className="flex flex-col gap-2 mt-4">
                {answers.map(answer => (
                    <span key={answer.id} className={`${verifyAnswerCorrect(answer)} p-2 rounded text-gray-100`}>
                        {answer.text}
                    </span>))}
            </div>
        )
    }

    function handleTryAgain() {
        location.reload();
    }

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center">
                    <QuestionsResultChart score={data.score} />
                    <div className="flex items-center gap-2 mt-4">
                    <h2 className="shadow text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full">Score: {data.score}%</h2>
                    <h2 className="shadow text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full">Corretas: {data.correctTotal}</h2>
                    <h2 className="shadow text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full">Total: {data.total}</h2>
                    </div>
                </div>
                {data?.questions?.length > 0 && data?.questions.map(question => {
                    return (
                        <div key={question.id} className={`bg-gray-200 text-gray-900 dark:text-gray-100 dark:bg-gray-600 rounded p-4 relative mt-4 drop-shadow-lg`}>
                            {questionIsCorrect(question.id) && <div className="py-1 px-2 text-sm text-gray-100 mb-2 bg-red-600 w-fit rounded-full absolute -top-4 -left-2"><h3>Incorreta</h3></div>}
                            <h3 className="text-lg">{question.text}</h3>
                            {mountAnswers(question.answers)}
                        </div>
                    )
                })}

                <div className="flex justify-center">
                    <Button onClick={handleTryAgain} text="Tentar novamente"/>
                </div>
            </div>
        </div>
    )
}
