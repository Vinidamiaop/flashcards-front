const subjectBase = process.env.NEXT_PUBLIC_FLASHCARDS_API_URL + '/subjects';

export async function getSubjects() {
    try {
        const data = await fetch(subjectBase);
        return await data.json();
    } catch (e) {
        throw {
            status: e?.code || 500,
            data: e?.response?.data,
            message: e?.response?.data?.message || e.message
        }
    }
}

export async function createSubject(data) {
    try {
        const response = await fetch(subjectBase, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "Application/json"
            }
        });
        return await response.json();
    } catch (e) {
        console.log(e);
        throw {
            status: e?.code || 500,
            data: e?.response?.data,
            message: e?.response?.data?.message || e.message
        }
    }
}


