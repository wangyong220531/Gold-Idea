"use client"
import { CommentItem } from "./comments"
import Image from "next/image"
import ToTopIcon from "../assets/toTop.png"
import AppraiseIcon from "../assets/appraise.png"
import ReplyIcon from "../assets/replyIcon.png"
import CancelReplyIcon from "../assets/cancelReplyIcon.png"
import { Fragment, useState } from "react"
import { AvatorMap, User } from "./detailFirstSection"
import advanceTime from "../utils/timeFormatConversion"
import { addComment } from "../pages/api"
import RightArrow from "../assets/rightArrow.png"
import traverseChildComments from "../utils/traverseChildComments"
import ToppedIcon from "../assets/toppedIcon.png"
import HonoredIcon from "../assets/honored.png"
import { Popover } from "antd"
import DeleteIcon from "../assets/deleteIcon.png"

export interface CommentItemProps extends Omit<CommentItem, "childComments"> {
    parent: CommentItem
    onAddReplySucceed: (parentId: number, replyContent: string) => void
    onHonorSucceed: (id: number, honorStatus: boolean) => void
    onChildCommentDeleted: (id: number) => void
}

export function Comment(props: CommentItemProps) {

    const { id, content, parent, createTime, publisher, isHonored, honorNote, isHonoredBy, onAddReplySucceed, onHonorSucceed, onChildCommentDeleted } = props

    const [currentCommentId, setCurrentCommentId] = useState(-1)
    const [inputedValue, setinputedValue] = useState("")

    function textareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setinputedValue(e.target.value)
    }

    async function handleReply() {
        onAddReplySucceed(Number(id), inputedValue)
        setCurrentCommentId(-1)
    }

    return <div className="w-full flex gap-x-6">
        <Image src={AvatorMap[publisher.userName]} alt={"用户头像"} width={46} className="rounded h-[46px]" />
        <div className="w-full flex flex-col gap-y-6">
            <div className="flex gap-x-4 text-xl items-center text-gray-400">
                <div className="text-gray-800 font-bold">{publisher.userName}</div>
                <div className="flex items-center">
                    <Image src={RightArrow} alt={"右箭头图标"} width={18} height={18} />
                    <div className="text-gray-800 font-bold">{parent.publisher.userName}</div>
                </div>
                <div>警号：{publisher.policeNo}</div>
                <div>单位：{publisher.unit.unitName}</div>
                <div>联系电话：{publisher.phone}</div>
            </div>
            <div className="text-2xl">{content}</div>
            <div className="flex gap-x-6 items-center text-xl text-gray-400">
                <div>发布时间：{advanceTime(createTime)}</div>
                <div className="flex gap-x-2 items-center cursor-pointer">
                    {isHonored ? <Popover content={<PopoverContent honorNote={honorNote} isHonoredBy={isHonoredBy} />}>
                        <div className="flex items-center gap-x-2">
                            <Image src={HonoredIcon} alt={"取消评优图标"} width={20} height={20} />
                            <div onClick={() => onHonorSucceed(id, true)}>取消评优</div>
                        </div>
                    </Popover> : <Fragment>
                        <Image src={AppraiseIcon} alt={"评优图标"} width={20} height={20} />
                        <div onClick={() => onHonorSucceed(id, false)}>评优</div>
                    </Fragment>}
                </div>
                {Number(id) === currentCommentId ? <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => setCurrentCommentId(-1)}>
                    <Image src={CancelReplyIcon} alt={"评优图标"} width={20} height={20} />
                    <div className="text-blue-600">取消回复</div>
                </div> :
                    <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => setCurrentCommentId(Number(id))}>
                        <Image src={ReplyIcon} alt={"评优图标"} width={20} height={20} />
                        <div>回复</div>
                    </div>
                }
                <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => onChildCommentDeleted(id)}>
                    <Image src={DeleteIcon} width={20} height={20} alt={"评论删除图标"} />
                    <div>删除</div>
                </div>
            </div>
            {Number(id) === currentCommentId && <div className="h-auto rounded-lg border-2 border-blue-600 p-2">
                <textarea className="w-full min-h-[180px] max-h-[180px] text-xl focus:outline-none" placeholder={"回复" + publisher.userName} onChange={textareaChange} />
                <div className="bg-blue-600 w-[100px] h-[40px] rounded-md flex justify-center items-center text-white ml-auto cursor-pointer" onClick={handleReply}>回复</div>
            </div>}
        </div>
    </div>
}

export interface PopoverContentProps {
    pinNote?: string
    isPinnedBy?: User
    honorNote?: string
    isHonoredBy?: User
}

export function PopoverContent(props: PopoverContentProps) {

    const { pinNote, isPinnedBy, honorNote, isHonoredBy } = props

    return <div className="flex flex-col gap-y-2">
        <div>备注：{pinNote ? pinNote : honorNote}</div>
        <div className="flex gap-x-2">
            <div>姓名：{isPinnedBy ? isPinnedBy.userName : isHonoredBy?.userName}</div>
            <div>警号：{isPinnedBy ? isPinnedBy.policeNo : isHonoredBy?.policeNo}</div>
            <div>手机号：{isPinnedBy ? isPinnedBy.phone : isHonoredBy?.phone}</div>
            <div>单位：{isPinnedBy ? isPinnedBy.unit.unitName : isHonoredBy?.unit.unitName}</div>
        </div>
    </div>
}

export interface CommentSectionProps extends Omit<CommentItem, "childComments"> {
    comment: CommentItem
    onAddReplySucceed: () => void
    onTopClick: (id: number) => void
    onHonorClick: (id: number, honorStatus: boolean) => void
    onCommentDelete: (id: number) => void
}

export function CommentSection(props: CommentSectionProps) {

    const { questionId, id, content, createTime, publisher, comment, isPinned, isHonored, isHonoredBy, honorNote, pinNote, isPinnedBy, onAddReplySucceed, onTopClick, onHonorClick, onCommentDelete } = props

    const [currentCommentId, setCurrentCommentId] = useState(-1)
    const [inputedValue, setinputedValue] = useState("")

    function textareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setinputedValue(e.target.value)
    }

    async function handleReply() {
        const res = await addComment(Number(questionId), inputedValue, 3, Number(id))
        if (!res) return
        setCurrentCommentId(-1)
        onAddReplySucceed()
    }

    async function handleAddReplySucceed(parentId: number, replyContent: string) {
        const res = await addComment(Number(questionId), replyContent, 3, parentId)
        if (!res) return
        onAddReplySucceed()
    }

    function handleHonorClick(id: number, honorStatus: boolean) {
        onHonorClick(id, honorStatus)
    }

    function handleChildCommentDel(id: number) {
        onCommentDelete(id)
    }

    return (
        <div className="w-full flex gap-x-6">
            <Image src={AvatorMap[publisher.userName]} alt={"用户头像"} width={46} className="rounded h-[46px] w-auto" />
            <div className="w-full flex flex-col gap-y-6">
                <div className="flex gap-x-4 text-xl items-center text-gray-400">
                    <div className="text-gray-800 font-bold">{publisher.userName}</div>
                    <div>警号：{publisher.policeNo}</div>
                    <div>单位：{publisher.unit.unitName}</div>
                    <div>联系电话：{publisher.phone}</div>
                </div>
                <div className="text-2xl">{content}</div>
                <div className="flex gap-x-6 items-center text-xl text-gray-400">
                    <div>发布时间：{advanceTime(createTime)}</div>
                    {isPinned ? <Popover content={<PopoverContent pinNote={pinNote} isPinnedBy={isPinnedBy} />}>
                        <Image src={ToppedIcon} alt={"已置顶图标"} width={40} height={40} />
                    </Popover> : <div className="flex gap-x-2 items-center cursor-pointer">
                        <Image src={ToTopIcon} alt={"置顶图标"} width={21} height={21} />
                        <div onClick={() => onTopClick(id)}>置顶</div>
                    </div>}
                    <div className="flex gap-x-2 items-center cursor-pointer">
                        {isHonored ? <Popover content={<PopoverContent isHonoredBy={isHonoredBy} honorNote={honorNote} />}>
                            <div className="flex items-center gap-x-2">
                                <Image src={HonoredIcon} alt={"评优图标"} width={20} height={20} />
                                <div onClick={() => onHonorClick(id, true)}>取消评优</div>
                            </div>
                        </Popover> : <Fragment>
                            <Image src={AppraiseIcon} alt={"评优图标"} width={20} height={20} />
                            <div onClick={() => onHonorClick(id, false)}>评优</div>
                        </Fragment>}
                    </div>
                    {Number(id) === currentCommentId ? <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => setCurrentCommentId(-1)}>
                        <Image src={CancelReplyIcon} alt={"评优图标"} width={20} height={20} />
                        <div className="text-blue-600">取消回复</div>
                    </div> :
                        <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => setCurrentCommentId(Number(id))}>
                            <Image src={ReplyIcon} alt={"评优图标"} width={20} height={20} />
                            <div>回复</div>
                        </div>
                    }
                    <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => onCommentDelete(id)}>
                        <Image src={DeleteIcon} width={20} height={20} alt={"评论删除图标"} />
                        <div>删除</div>
                    </div>
                </div>
                {Number(id) === currentCommentId && <div className="h-auto rounded-lg border-2 border-blue-600 p-2">
                    <textarea className="w-full min-h-[180px] max-h-[180px] text-xl focus:outline-none" placeholder={"回复" + publisher.userName} onChange={textareaChange} />
                    <div className="bg-blue-600 w-[100px] h-[40px] rounded-md flex justify-center items-center text-white ml-auto cursor-pointer" onClick={handleReply}>回复</div>
                </div>}
                {traverseChildComments(comment).childComments.map((childComment: CommentItem) => {
                    return <Comment key={childComment.id} onAddReplySucceed={handleAddReplySucceed} id={childComment.id} content={childComment.content} publisherId={childComment.publisherId} questionId={childComment.questionId} createTime={childComment.createTime} updateTime={childComment.updateTime} publisher={childComment.publisher} parent={childComment.parent} parentId={childComment.parentId} isPinned={false} onHonorSucceed={handleHonorClick} isHonored={childComment.isHonored} honorNote={childComment.honorNote} honoredUserId={childComment.honoredUserId} isHonoredBy={childComment.isHonoredBy} deleted={childComment.deleted} deletedByUserId={childComment.deletedByUserId} isDeletedBy={childComment.isDeletedBy} onChildCommentDeleted={handleChildCommentDel} />
                })}
            </div>
        </div>
    )
}