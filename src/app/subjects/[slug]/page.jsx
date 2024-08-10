import {getQuestionsBySubjectId} from "@/api/Questions";
import Button from "@/components/FormComponents/Button";
import StudyActivite from "@/components/StudyActivite";
import Modal from "@/components/Modal";

async function getQuestions(id) {
    try {
        return await getQuestionsBySubjectId(id);
    } catch (e) {
        // console.log(e);
    }
}

export default async function Subject({params}) {
    const questions = await getQuestions(params.slug);
    return (
        <div className="mx-auto lg:w-1/2 p-4">
            <StudyActivite data={questions?.data} slug={params.slug} />
        </div>
    )
}

