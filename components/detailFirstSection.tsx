"use client"
import Image, { StaticImageData } from "next/image"
import { CommentItem } from "./comments"
import XvTengAvator from "../assets/XvTengAvator.jpg"
import BuYuanHaoAvator from "../assets/BuYuanHaoAvator.jpg"
import WangyongAvator from "../assets/avator.jpg"
import { Unit } from "../app/detail/[id]/page"
import advanceTime from "../utils/timeFormatConversion"
import { Fragment, useEffect, useState } from "react"
import { QuestionModalSource } from "./questionModal"
import PencileIcon from "../assets/pencileIcon.png"
import LeaveMessageIcon from "../assets/leaveMessageIcon.png"
import { Attention } from "./questionContainer"
import { attentionQuestion } from "../pages/api"
import { useUser } from "../app/lib/userContext"

export const AvatorMap: Record<string, StaticImageData> = {
    "徐腾": XvTengAvator,
    "卜元浩": BuYuanHaoAvator,
    "王勇": WangyongAvator
}

export interface User {
    id: number
    avator: StaticImageData
    userName: string
    policeNo: string
    phone: string
    unitId: number
    commentId: number
    unit: Unit
}

export interface QuestionDetail {
    id: number
    content: string
    goal: string
    createTime: string
    publisher: User,
    comments: CommentItem[]
    attentions: Attention[]
    onFunctionClick: (source: QuestionModalSource, id?: number) => void
}

export default function DetailFirstSection(props: QuestionDetail) {

    const { id, content, publisher, createTime, goal, attentions, onFunctionClick } = props
    const [isAttentioned, setIsAttentioned] = useState(false)
    const { userInfo } = useUser()

    useEffect(() => {
        judgeIsAttentioned()
    }, [])

    function judgeIsAttentioned() {
        if (attentions.find((attention: Attention) => attention.userId === userInfo.id)) {
            setIsAttentioned(true)
            return
        }
        if (!attentions.find((attention: Attention) => attention.userId === userInfo.id)) {
            setIsAttentioned(false)
            return
        }
    }

    async function attentionClick() {
        const res = await attentionQuestion(id, userInfo.id, isAttentioned)
        if (!res) return
        if (isAttentioned) {
            setIsAttentioned(false)
            return
        }
        if (!isAttentioned) {
            setIsAttentioned(true)
            return
        }
    }

    return (
        <Fragment>
            <div className="w-[1200px] h-auro p-10 rounded bg-white shadow-sm flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-4">
                    <div className="text-3xl font-semibold">{content}</div>
                    <div className="flex gap-x-4 items-center text-xl text-gray-600">
                        <div className="flex gap-x-2.5 items-center">
                            <Image src={AvatorMap[publisher.userName]} alt="创建者头像" width={36} height={36} className="rounded" />
                            <div className="text-black font-medium">{publisher.userName}</div>
                        </div>
                        <div className="flex gap-x-4 items-center text-gray-400">
                            <div>警号：{publisher.policeNo}</div>
                            <div>所属单位：{publisher.unit.unitName}</div>
                            <div>联系电话：{publisher.phone}</div>
                        </div>
                    </div>
                </div>
                <div className="text-2xl text-gray-600 border-l-[8px] border-blue-600 pl-3">{goal ? goal : "暂无目的"}</div>
                <div className="flex gap-x-6 items-center">
                    <div className={`w-[120px] h-[50px] rounded-md text-white font-semibold text-2xl flex justify-center items-center cursor-pointer ${isAttentioned ? "bg-gray-400" : "bg-blue-600"}`} onClick={attentionClick}>{isAttentioned ? "已关注" : "关注"}</div>
                    {!goal && <div className="w-[160px] h-[50px] flex gap-x-1 rounded-md  border-2 border-blue-500 justify-center items-center cursor-pointer" onClick={() => onFunctionClick("addGoal", id)}>
                        <Image src={PencileIcon} alt={"添加目的图标"} width={24} height={24} />
                        <div className="text-blue-600 font-semibol text-2xl">添加目的</div>
                    </div>}
                    <div className="w-[160px] h-[50px] flex gap-x-1 rounded-md border-2 border-blue-500 justify-center items-center cursor-pointer" onClick={() => onFunctionClick("addComment", id)}>
                        <Image src={LeaveMessageIcon} alt={"添加目的图标"} width={24} height={24} />
                        <div className="text-blue-600 font-semibol text-2xl">添加留言</div>
                    </div>
                    <div className="text-xl text-gray-400">发表时间：{advanceTime(createTime)}</div>
                </div>
            </div>
        </Fragment>
    )
}