"use client"
import { Attention, Collection, Question } from "./questionContainer"
import Quote from "../assets/quote.png"
import Image from "next/image"
import Link from "next/link"
import advanceTime from "../utils/timeFormatConversion"
import DefaultCollectionIcon from "../assets/defaultCollect.png"
import CollectedIcon from "../assets/collected.png"
import UnAttentionedIcon from "../assets/unattentioned.png"
import AttentionedIcon from "../assets/attentioned.png"
import React, { useEffect, useState } from "react"
import { attentionQuestion, collectQuestion } from "../pages/api"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUser } from "../app/lib/userContext"

export interface QuestionCardProps extends Omit<Question, "comments"> {
    referCount: number
}

export default function QuestionCard(props: QuestionCardProps) {

    const { id, content, goal, referCount, createTime, publisher, collections, attentions } = props
    const [currentCollectionsCount, setCurrentCollectionsCount] = useState(collections.length)
    const [currentAttentionsCount, setCurrentAttentionsCount] = useState(attentions.length)
    const [isCollected, setIsCollected] = useState(false)
    const [isAttentioned, setIsAttentioned] = useState(false)
    const { userInfo } = useUser()

    useEffect(() => {
        isCollectedJudge()
        isAttentionedJudge()
        console.log(33,userInfo);
        
    }, [collections, attentions])

    function isCollectedJudge() {
        if (collections.find((collection: Collection) => collection.userId === userInfo.id)) {
            setIsCollected(true)
            return
        }
        if (!collections.find((collection: Collection) => collection.userId === userInfo.id)) {
            setIsCollected(false)
            return
        }
    }

    function isAttentionedJudge() {
        if (attentions.find((attention: Attention) => attention.userId === userInfo.id)) {
            setIsAttentioned(true)
            return
        }
        if (!attentions.find((attention: Attention) => attention.userId === userInfo.id)) {
            setIsAttentioned(false)
            return
        }
    }

    async function handleCollect(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        event.preventDefault()
        const res = await collectQuestion(id, userInfo.id, isCollected)
        if (!res) return
        if (isCollected) {
            setCurrentCollectionsCount(currentCollectionsCount - 1)
            setIsCollected(false)
            return
        }
        if (!isCollected) {
            setCurrentCollectionsCount(currentCollectionsCount + 1)
            setIsCollected(true)
            return
        }
    }

    async function handleAttention(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        event.preventDefault()
        const res = await attentionQuestion(id, userInfo.id, isAttentioned)
        if (!res) return
        if (isAttentioned) {
            setCurrentAttentionsCount(currentAttentionsCount - 1)
            setIsAttentioned(false)
            return
        }
        if (!isAttentioned) {
            setCurrentAttentionsCount(currentAttentionsCount + 1)
            setIsAttentioned(true)
            return
        }
    }

    function handleLinkClick() {
        NProgress.start()
        NProgress.configure({
            minimum: 0.1,
            showSpinner: false,
            easing: 'ease',
            speed: 500,
        });
    }

    return (
        <Link className="w-full h-full bg-white text-black p-8 cursor-pointer flex flex-col gap-y-8" onClick={handleLinkClick} href={`/detail/${id}`}>
            <div className="flex flex-col gap-y-4">
                <div className="text-2xl font-semibold text-stone-800">{content}</div>
                <div className="flex items-center gap-x-2 text-gray-500">
                    <div>发布者：{publisher.userName}</div>
                    <div>警号：{publisher.policeNo}</div>
                    <div>单位：{publisher.unit.unitName}</div>
                    <div>手机号：{publisher.phone}</div>
                </div>
            </div>
            <div className="flex flex-wrap text-xl text-zinc-600 line-clamp-2 overflow-hidden">
                {goal}
            </div>
            <div className="mt-auto flex gap-x-6 items-center text-xl text-gray-500">
                <div className="flex gap-x-1 items-center cursor-pointer">
                    <Image src={Quote} alt={"引用"} width={26} height={18} className="transform rotate-225 scale-x-[-1]" />
                    <div>{referCount}条引用</div>
                </div>
                <div>发布时间：{advanceTime(createTime)}</div>
                <div className="flex gap-x-1 items-center transform -translate-y-[1px] cursor-pointer" onClick={handleCollect}>
                    <Image src={isCollected ? CollectedIcon : DefaultCollectionIcon} alt={"收藏图标"} width={24} height={14} />
                    <div className={isCollected ? "text-blue-600" : ""}>{currentCollectionsCount}</div>
                </div>
                <div className="flex gap-x-1 items-center cursor-pointer">
                    <Image src={isAttentioned ? AttentionedIcon : UnAttentionedIcon} alt={"关注图标"} width={24} height={14} onClick={handleAttention} />
                    <div className={isAttentioned ? "text-blue-600" : ""}>{currentAttentionsCount}</div>
                </div>
            </div>
        </Link>
    )
}