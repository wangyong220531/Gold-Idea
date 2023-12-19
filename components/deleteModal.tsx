"use client"
import { Fragment, useEffect } from "react"
import Image from "next/image"
import WarningIcon from "../assets/warningIcon.png"
import InnerCloseIcon from "../assets/innerCloseIcon.png"

export interface DeleteModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function DeleteModal(props: DeleteModalProps) {

    const { open, onClose, onConfirm } = props

    useEffect(() => {
        const disableScroll = (e: WheelEvent) => {
            e.preventDefault()
            e.stopPropagation()
        }
        if (open) {
            document.body.addEventListener('wheel', disableScroll, { passive: false })
        } else {
            document.body.removeEventListener('wheel', disableScroll)
        }
        return () => {
            document.body.removeEventListener('wheel', disableScroll)
        }
    }, [open])

    return <Fragment>
        {open && <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-10">
            <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[260px] bg-white rounded-md p-10 flex flex-col gap-y-8">
                <div className="text-2xl font-bold">提示</div>
                <div className="flex gap-x-4 justify-center items-center">
                    <Image src={WarningIcon} alt="警告图标" width={34} />
                    <div className="flex text-2xl justify-center">确定要删除吗？</div>
                </div>
                <div className="flex justify-center gap-x-10 text-lg mt-2">
                    <div className="px-10 py-2 rounded-md border-2 border-gray-200 text-black cursor-pointer" onClick={onClose}>取消</div>
                    <div className="px-10 py-2 rounded-md bg-blue-600 text-white cursor-pointer" onClick={onConfirm}>确定</div>
                </div>
                <Image src={InnerCloseIcon} alt={"内部关闭图标"} width={18} className="h-auto absolute top-6 right-6 cursor-pointer" onClick={onClose} />
            </div>
        </div>}
    </Fragment>
}