import {getQuestionsBySubjectId} from "@/api/Questions";

async function getQuestions(id) {
    try {
        return await getQuestionsBySubjectId(id);
    } catch (e) {
        // console.log(e);
    }
}

export default async function SubjectEdit({params}) {
    const questions = await getQuestions(params.slug);
    return (
        <div className="mx-auto lg:w-1/2 p-4">
            <h2>Edit Page</h2>
        </div>
    )
}
