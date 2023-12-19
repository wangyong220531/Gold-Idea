"use client"
import { Fragment, useState } from "react";
import Image from "next/image";
import Avator from "../assets/avator.jpg"
import ModalCloseIcon from "../assets/modalCloseIcon.png"
import { editQuestion } from "../pages/api";

export interface QuestionEditModalProps {
    open: boolean
    questionId: number
    content: string
    goal: string
    onCloseModal: () => void
    onFetchNewQuestionDetail: () => void
}

export default function QuestionEditModal(props: QuestionEditModalProps) {

    const { open, onCloseModal, questionId, content, goal, onFetchNewQuestionDetail } = props
    const [currentContent, setCurrentContent] = useState(content)
    const [currentGoal, setCurrentGoal] = useState(goal)

    function handleContentInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCurrentContent(e.target.value)
    }

    function handleGoalInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCurrentGoal(e.target.value)
    }

    async function submit() {
        const res = await editQuestion(questionId, currentContent, currentGoal)
        if (!res) return
        onCloseModal()
        onFetchNewQuestionDetail()
    }

    return <Fragment>
        {open && <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-10">
            <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-x-2.5">
                <div className="w-[1000px] bg-white rounded flex flex-col gap-y-3 p-10">
                    <div className="flex h-full gap-x-2.5">
                        <Image src={Avator} width={56} alt="用户头像" className="h-[56px] w-auto rounded" />
                        <div className="flex flex-col gap-y-4 w-full">
                            <div className="flex flex-col gap-y-2">
                                <div className="text-2xl">内容：</div>
                                <textarea className="min-h-[260px] max-h-[260px] w-full text-2xl rounded-sm border border-gray-200 focus:outline-none p-2.5" placeholder="请输入问题内容" value={currentContent} onChange={handleContentInput} />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className="text-2xl">目标：</div>
                                <textarea className="min-h-[260px] max-h-[260px] w-full text-2xl rounded-sm border border-gray-200 focus:outline-none p-2.5" placeholder="请输入问题目标" value={currentGoal} onChange={handleGoalInput} />
                            </div>
                        </div>
                    </div>
                    <div className="w-[130px] h-[60px] text-white text-xl rounded bg-blue-700 flex justify-center items-center ml-auto cursor-pointer" onClick={submit}>提交</div>
                </div>
                <Image src={ModalCloseIcon} alt="弹窗关闭图标" width={40} onClick={() => onCloseModal()} className="h-[40px] w-auto cursor-pointer" />
            </div>
        </div>}
    </Fragment>
}