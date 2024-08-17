export function cleanDataBeforeSubmit(data) {
    const validQuestions = data.questions.filter((item) => {
        const isValidQuestion = item.text.length > 0 && item.answers.length > 0
        const hasValidAnswer = item.answers.filter(answer => answer.text.length > 0).length > 0;
        if(item.isNewItem === true) {
            item.id = 0;
        }
        item.answers = item.answers.map(answer => {
            if(answer.isNewItem === true) {
                answer.id = 0;
            }
            return answer;
        })

        return isValidQuestion && hasValidAnswer;
    });
    const validData = data;
    validData.questions = validQuestions;

    return validData;
}

export default function validateSubjectForm(data, setErrors) {
    const errorList = [];

    if (data.title.length <= 0) {
        errorList.push("Título é obrigatório");
    }

    if (data.description.length > 255) {
        errorList.push("A descrição deve ter no máximo 255 caracteres.");
    }

    setErrors(errorList);

    return errorList.length <= 0;
}

export function nextStep(data, steps, setSteps, setErrors) {
    let nextActiveIndex = null;
    const currentActiveStep = steps.find(item => item.active);
    if (currentActiveStep.stepIsValid != null && !currentActiveStep.stepIsValid(data, setErrors)) {
        return;
    }
    const currentStep = steps.map((step, index) => {
        if (step.active) {
            step.active = false;
            step.completed = true;
            nextActiveIndex = ++index;
        } else if (nextActiveIndex && nextActiveIndex === index) {
            step.active = true;
        }

        return step;
    })
    setSteps(() => currentStep);
}


export function previusStep(data, steps, setSteps, setErrors) {
    let nextActiveIndex = null;
    const currentStepIndex = steps.findIndex(item => item.active);
    const currentStep = steps.map((step, index) => {
        if (currentStepIndex === index) {
            step.active = false;
            step.completed = false;
        } else if (currentStepIndex === index + 1) {
            step.active = true;
            step.completed = false;
        }

        return step;
    })
    setSteps(() => currentStep);
}
