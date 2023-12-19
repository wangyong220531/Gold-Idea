"use client"
import { Fragment, useEffect, useState } from "react"
import DetailFirstSection, { User } from "./detailFirstSection"
import DetailSecondSection from "./detailSecondSection"
import { Question } from "./questionContainer"
import QuestionModal, { QuestionModalSource } from "./questionModal"
import QuestionEditModal from "./questionEditModal"
import { API_BASE_URL } from "../constant/publicURL"
import { Skeleton } from "antd"
import LeftSideToolbar from "./leftSideToolbar"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import { DeleteComment, toHonorComment } from "../pages/api"
import { useUser } from "../app/lib/userContext"
import DeleteModal from "./deleteModal"

export interface DetailMidProps {
    questionId: number
    userDemo: User
}

async function findQuestionById(id: number) {
    const res = await fetch(`${API_BASE_URL}/findQuestionByID?id=${id}`, { cache: 'no-store' })
    if (!res.ok) return
    return res.json()
}

export default function DetailMid(props: DetailMidProps) {

    const { questionId, userDemo } = props

    const [modalOpen, setModalOpen] = useState(false)
    const [modalSource, setModalSource] = useState<QuestionModalSource>("addGoal")
    const [thisQuestionId, setThisQuestionId] = useState<number | undefined>(0)
    const [thisCommentId, setThisCommentId] = useState<number | undefined>(0)
    const [thisHonorStatus, setThisHonorStatus] = useState(false)
    const [question, setQuestion] = useState<Question | null>(null)
    const [gotQuestion, setGotQuestion] = useState(false)
    const [questionEditOpen, setQuestionEditOpen] = useState(false)
    const { userInfo } = useUser()
    const [delConfirmModalOpen, setDelConfirmModalOpen] = useState(false)
    const [deleteCommentIdList, setDeleteCommentIdList] = useState<number[]>([])

    useEffect(() => {
        NProgress.done()
        fetchQuestion()
    }, [])

    async function fetchQuestion() {
        const res = await findQuestionById(questionId)
        if (!res) return
        setGotQuestion(true)
        setQuestion(res)
    }

    function handleFunctionClick(source: QuestionModalSource, id?: number) {
        setModalSource(source)
        setThisQuestionId(id)
        setModalOpen(true)
    }

    async function onAddReplySucceed() {
        await fetchQuestion()
    }

    function handleToTopClick(questionId: number, id: number) {
        setThisQuestionId(questionId)
        setThisCommentId(id)
        setModalSource("toTop")
        setModalOpen(true)
    }

    async function handleHonorClick(questionId: number, id: number, honorStatus: boolean) {
        if (honorStatus) {
            const res = await toHonorComment(questionId, id, "", userInfo.id, honorStatus)
            if (!res) return
            await fetchQuestion()
            return
        }
        setThisQuestionId(questionId)
        setThisCommentId(id)
        setThisHonorStatus(honorStatus)
        setModalSource("honor")
        setModalOpen(true)
    }

    function handleOnCommentDelete(idList: number[]) {
        setDelConfirmModalOpen(true)
        setDeleteCommentIdList(idList)
    }

    async function handleDelConfirm() {
        const res = await DeleteComment(deleteCommentIdList, userInfo.id)
        if (!res) return
        setDelConfirmModalOpen(false)
        await fetchQuestion()
    }

    return (
        <Fragment>
            {
                gotQuestion ? <Fragment>
                    {question && <div className="w-full h-auto mt-[140px] flex flex-col gap-y-10 justify-center items-center">
                        <DetailFirstSection id={question.id} content={question.content} goal={question.goal} createTime={question.createTime} comments={question.comments} publisher={question.publisher} onFunctionClick={handleFunctionClick} attentions={question.attentions} />
                        <DetailSecondSection userDemo={userDemo} question={question} onAddReplySucceed={onAddReplySucceed} onTopClickSucceed={handleToTopClick} onHonorClickSucceed={handleHonorClick} onCommentDelete={handleOnCommentDelete} />
                    </div>}
                </Fragment> : <div className="flex justify-center">
                    <Skeleton active className="bg-white p-8 w-[1200px] mt-[140px]" />
                </div>
            }
            {question && <LeftSideToolbar questionId={question.id} collections={question.collections} onEditClick={() => setQuestionEditOpen(true)} />}
            <QuestionModal open={modalOpen} source={modalSource} onCloseModal={() => setModalOpen(false)} questionId={thisQuestionId} commentId={thisCommentId} honorStatus={thisHonorStatus} onFetchNewQuestionDetail={() => fetchQuestion()} />
            {question && <QuestionEditModal open={questionEditOpen} questionId={question.id} content={question.content} goal={question.goal} onCloseModal={() => setQuestionEditOpen(false)} onFetchNewQuestionDetail={() => fetchQuestion()} />}
            <DeleteModal open={delConfirmModalOpen} onClose={() => setDelConfirmModalOpen(false)} onConfirm={handleDelConfirm} />
        </Fragment>
    )
}