"use client"
import Comments from "./comments"
import { User } from "./detailFirstSection"
import { Question } from "./questionContainer"

export interface DetailSecondSectionProps {
    userDemo: User
    question: Question
    onAddReplySucceed: () => void
    onTopClickSucceed: (questionId: number, id: number) => void
    onHonorClickSucceed: (questionId: number, id: number, honorStatus: boolean) => void
    onCommentDelete: (id: number) => void
}

export default function DetailSecondSection(props: DetailSecondSectionProps) {

    const { question, onAddReplySucceed, onTopClickSucceed, onHonorClickSucceed, onCommentDelete } = props

    function onTopClick(id: number) {
        onTopClickSucceed(question.id, id)
    }

    function handleHonorClick(id: number, honorStatus: boolean) {
        onHonorClickSucceed(question.id, id, honorStatus)
    }

    return (
        <div className="w-[1200px] h-auto min-h-[300px] flex flex-col gap-y-6 p-10 rounded bg-white shadow-sm">
            <div className="text-2xl text-black font-semibold">留言&nbsp;&nbsp;{question.comments.length}</div>
            <Comments comments={question.comments} onAddReplySucceed={onAddReplySucceed} onTopClick={onTopClick} onHonorClick={handleHonorClick} onCommentDelete={onCommentDelete} />
        </div>
    )
}