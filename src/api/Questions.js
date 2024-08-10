const questionsBase = process.env.NEXT_PUBLIC_FLASHCARDS_API_URL + '/questions'

export async function getQuestionsBySubjectId(subjectSlug) {
    try {
        const data = await fetch(`${questionsBase}/subject/${subjectSlug}`)
        return await data.json();
    } catch (e) {
        throw {
            status: e?.code,
            data: e?.response?.data,
            message: e?.response?.data?.message || e.message
        }
    }
}

export async function getQuestionsCorrection(data) {
    try {

        const response = await fetch(`${questionsBase}/correction`, {
            method: "POST",
            body: JSON.stringify({questions: data}),
            headers: {
                "Content-Type": "Application/json"
            }
        })
        return await response.json();
    } catch (e) {
        console.log(e);
        throw {
            status: e?.code,
            data: e?.response?.data,
            message: e?.response?.data?.message || e.message
        }
    }
}
