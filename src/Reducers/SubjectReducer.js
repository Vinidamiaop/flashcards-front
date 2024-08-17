export function SubjectReducer(state, action) {
    const MAX_RANDOM_VALUE = 999;

    function generateRandomId(questionIndex = null, isQuestion = false) {
        let randomNumber;
        let currentQuestion;

        if (!isQuestion) {
            currentQuestion = state.questions.filter(item => Number(item.randomIndex) === Number(questionIndex))
        } else {
            currentQuestion = state;
        }

        const key = isQuestion ? 'questions' : 'answers';
        if (currentQuestion[key] != null) {
            do {
                randomNumber = (Math.random() * MAX_RANDOM_VALUE).toFixed();
            } while (currentQuestion[key].filter(item => Number(item.randomIndex) === Number(randomNumber)).length > 0);
        } else {
            return (Math.random() * MAX_RANDOM_VALUE).toFixed();
        }

        return randomNumber;
    }

    switch (action.type) {
        case 'SET_INITIAL_DATA':
            return {...state, ...action.payload};
        case 'INITIALIZE_QUESTIONS':
            return {
                ...state,
                questions: [
                    {
                        randomIndex: generateRandomId(null, true),
                        text: '',
                        answers: [
                            {randomIndex: generateRandomId(), text: '', isCorrect: false}
                        ]
                    }
                ]
            };
        case 'ADD_QUESTION':
            return {
                ...state,
                questions: [
                    ...state.questions,
                    {
                        randomIndex: generateRandomId(null, true),
                        text: '',
                        isNewItem: true,
                        answers: [
                            {randomIndex: generateRandomId(), text: '', isCorrect: false, isNewItem: true}
                        ]
                    }
                ]
            };
        case 'ADD_ANSWER':
            return {
                ...state,
                questions: state.questions.map(item => {
                    if (item.randomIndex === action.payload.questionIndex) {
                        return {
                            ...item,
                            answers: [
                                ...item.answers,
                                {
                                    randomIndex: generateRandomId(item.randomIndex),
                                    text: '',
                                    isCorrect: false,
                                    isNewItem: true
                                }
                            ]
                        };
                    }
                    return item;
                })
            };
        case 'REMOVE_QUESTION':
            const deletedQuestions = state.deletedQuestions;
            const deletedQuestion = state.questions.find(item => {
                return item.randomIndex === action.payload.questionIndex && item?.id;
            });
            if (deletedQuestion) {
                const itemJaCadastrado = deletedQuestions.filter(item => item.id === deletedQuestion.id).length;
                if(!itemJaCadastrado) deletedQuestions.push(deletedQuestion)
            }

            return {
                ...state,
                questions: state.questions.filter(item => item.randomIndex !== action.payload.questionIndex),
                deletedQuestions: deletedQuestions
            };
        case 'REMOVE_ANSWER':
            const deletedAnswers = state.deletedAnswers;
            const question = state.questions.find(item => {
                return item.randomIndex === action.payload.questionIndex;
            })
            const deletedAnswer = question.answers.find(item => {
                return item.randomIndex === action.payload.answerIndex && item?.id;
            });

            if (deletedAnswer) {
                const itemJaCadastrado = deletedAnswers.filter(item => item.id === deletedAnswer.id).length;
                if(!itemJaCadastrado) deletedAnswers.push(deletedAnswer);
            }
            return {
                ...state,
                questions: state.questions.map(item => {
                    if (item.randomIndex === action.payload.questionIndex) {
                        return {
                            ...item,
                            answers: item.answers.filter(answer => answer.randomIndex !== action.payload.answerIndex)
                        };
                    }
                    return item;
                }),
                deletedAnswers: deletedAnswers
            };
        case 'CHANGE_SUBJECT':
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        case 'CHANGE_QUESTION':
            return {
                ...state,
                questions: state.questions.map(item => {
                    if (item.randomIndex === action.payload.questionIndex) {
                        item.text = action.payload.text;
                    }
                    return item;
                })
            };
        case 'CHANGE_ANSWER':
            return {
                ...state,
                questions: state.questions.map(item => {
                    if (item.randomIndex === action.payload.questionIndex) {
                        return {
                            ...item,
                            answers: item.answers.map(answer => {
                                if (answer.randomIndex === action.payload.answerIndex) {
                                    return {
                                        ...answer,
                                        [action.payload.key]: action.payload.value
                                    };
                                }
                                return answer;
                            })
                        };
                    }
                    return item;
                })
            };
        default:
            return state;
    }
}
