"use client"
import EditIcon from "../assets/editIcon.png"
import DeleteIcon from "../assets/deleteIcon.png"
import UnCollectionIcon from "../assets/defaultCollect.png"
import CollectedIcon from "../assets/collected.png"
import Image from "next/image"
import { Collection } from "./questionContainer"
import { Fragment, useEffect, useState } from "react"
import { collectQuestion, deleteQuestion } from "../pages/api"
import DeleteModal from "./deleteModal"
import { useRouter } from "next/navigation"
import { useUser } from "../app/lib/userContext"

export interface LeftSideToolbarProps {
    questionId: number
    collections: Collection[]
    onEditClick: () => void
}

export default function LeftSideToolbar(props: LeftSideToolbarProps) {

    const { questionId, collections, onEditClick } = props
    const [isCollected, setIsCollected] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const router = useRouter()
    const { userInfo } = useUser()

    useEffect(() => {
        judgeIsCollected()
    }, [collections])

    function judgeIsCollected() {
        if (collections.find((colllection: Collection) => colllection.userId === userInfo.id)) {
            setIsCollected(true)
            return
        }
        if (!collections.find((colllection: Collection) => colllection.userId === userInfo.id)) {
            setIsCollected(false)
            return
        }
    }

    async function handleAttentionClick() {
        const res = await collectQuestion(questionId, userInfo.id, isCollected)
        if (!res) return
        if (isCollected) {
            setIsCollected(false)
            return
        }
        if (!isCollected) {
            setIsCollected(true)
            return
        }
    }

    async function handleConfirmDelete() {
        const res = await deleteQuestion(questionId, userInfo.id)
        if (!res) return
        router.push("/")
    }

    return (
        <Fragment>
            <div className="flex flex-col gap-y-6 fixed top-1/2 transform -translate-y-1/2 left-0 pl-4">
                <div className="p-4 rounded-full bg-white cursor-pointer hover:shadow-lg">
                    <Image src={EditIcon} width={40} height={40} alt="编辑图标" onClick={() => onEditClick()} />
                </div>
                <div className="p-4 rounded-full bg-white cursor-pointer hover:shadow-lg" onClick={handleAttentionClick}>
                    <Image src={isCollected ? CollectedIcon : UnCollectionIcon} width={40} height={40} alt="关注图标" />
                </div>
                <div className="p-4 rounded-full bg-white cursor-pointer flex justify-center items-center hover:shadow-lg" onClick={() => setDeleteModalOpen(true)}>
                    <Image src={DeleteIcon} width={34} height={34} alt="删除图标" />
                </div>
            </div>
            <DeleteModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
        </Fragment>
    )
}