"use client"
import QuestionCard from "./questionCard"
import { User } from "./detailFirstSection"
import { CommentItem } from "./comments"
import { useEffect } from "react"
import { Skeleton } from "antd"

export interface Collection {
    id: number
    userId: number
    questionId: number
    createTime: string
    updateTime: string
}

export interface Attention extends Collection { }

export interface Question {
    id: number
    content: string
    goal: string
    comments: CommentItem[]
    collections: Collection[]
    attentions: Attention[]
    createTime: string
    updateTime: string
    publisher: User
}

export interface QuestionContainerProps {
    questions: Question[]
    pageNo: number
    onScrollToBottom: (newPageNo: number) => void
}

export default function QuestionContainer(props: QuestionContainerProps) {

    const { pageNo, questions, onScrollToBottom } = props

    useEffect(() => {
        function handleScroll() {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight) {
                onScrollToBottom(pageNo + 1)
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className="w-9/12 flex flex-col gap-y-2.5 overflow-y-auto">
            {questions && questions.map((question: Question) => <QuestionCard key={question.id} id={question.id} content={question.content} goal={question.goal} referCount={question.comments.length} createTime={question.createTime} publisher={question.publisher} updateTime={question.updateTime} collections={question.collections} attentions={question.attentions} />)}
            <Skeleton active className="bg-white p-8" />
        </div>
    )
}