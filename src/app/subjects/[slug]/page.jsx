import {getQuestionsBySubjectId} from "@/api/Questions";
import StudyActivite from "@/components/StudyActivite";
import Link from "next/link";
import {FaPen} from "react-icons/fa";
import {getSubjectById} from "@/api/Subjects";
import {toast} from "react-toastify";

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

export default async function Subject({params}) {
    const questions = await getQuestions(params.slug);
    let subject = null;
    if (questions?.data?.length > 0) {
        subject = await getSubject(questions.data[0].subjectId);
    }
    return (
        <div className="mx-auto lg:w-1/2 p-4">
            <div className="flex justify-between items-center p-2 mb-10">
                <div>
                    {subject && <h2>{subject.data.title}</h2>}
                </div>
                <Link className="bg-indigo-600 p-2 rounded-full"
                      href={`/subjects/${params.slug}/edit`} prefetch={true}>
                    <FaPen/>
                </Link>
            </div>
            <StudyActivite data={questions?.data} slug={params.slug}/>
        </div>
    )
}

