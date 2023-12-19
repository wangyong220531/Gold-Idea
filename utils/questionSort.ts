import { wyDeepClone } from "wangyong-utils"
import { Question } from "../components/questionContainer"
import dayjs from "dayjs"

export function sortByCommentsCount(questions: Question[]) {
    const questionsDeepCopy = wyDeepClone(questions)
    const result = questionsDeepCopy.sort((a, b) => {
        return b.comments.length - a.comments.length
    })
    return result
}

export function sortByUpdateTimeDesc(questions: Question[]) {
    const questionsDeepCopy = wyDeepClone(questions)
    const result = questionsDeepCopy.sort((a, b) => {
        return dayjs(b.updateTime).unix() - dayjs(a.updateTime).unix()
    })
    return result
}

export function filterNearlyOneWeek(questions: Question[]) {
    const questionsDeepCopy = wyDeepClone(questions)
    const result = questionsDeepCopy.filter(question => {
        return dayjs().unix() - dayjs(question.updateTime).unix() < 7 * 24 * 60 * 60
    })
    return result
}

export function filterNearlyOneMonth(questions: Question[]) {
    const questionsDeepCopy = wyDeepClone(questions)
    const result = questionsDeepCopy.filter(question => {
        return dayjs().unix() - dayjs(question.updateTime).unix() < 30 * 24 * 60 * 60
    })
    return result
}

export function filterNearlyOneYear(questions: Question[]) {
    const questionsDeepCopy = wyDeepClone(questions)
    const result = questionsDeepCopy.filter(question => {
        return dayjs().unix() - dayjs(question.updateTime).unix() < 365 * 24 * 60 * 60
    })
    return result
}
