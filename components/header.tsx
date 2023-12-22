"use client"
import Image from "next/image"
import SearchIcon from "../assets/searchIcon.png"
import Avator from "../assets/avator.jpg"
import Link from "next/link"
import { Fragment, useState } from "react"
import QuestionModal from "./questionModal"
import { AccountDropdown } from "./accountDropdown"

export function Search() {

    const [inputFocused, setInputFocused] = useState(false)

    return (
        <div className="flex">
            <input className={`h-14 pl-2 pr-2 text-xl border-2 border-blue-700 outline-none rounded-l transition-width duration-300 ${inputFocused ? "w-[600px]" : "w-96"}`} placeholder="探索“深海金点子”" onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} />
            <div className="w-16 h-14 flex justify-center items-center bg-blue-700 rounded-r">
                <Image src={SearchIcon} alt={"搜索图标"} width={30} height={30} />
            </div>
        </div>
    )
}
export interface HeaderProps {
    isHomePage: boolean
}

export default function Header(props: HeaderProps) {

    const { isHomePage } = props

    const [accountDropdownShow, setAccountDropdownShow] = useState(false)
    const [publishQuestionOpen, setPublishQuestionOpen] = useState(false)

    function handlePublishBtnCLick() {
        if (publishQuestionOpen) return
        setPublishQuestionOpen(true)
    }

    function foo() {
        console.log("foo")
    }

    return (
        <Fragment>
            <div className="w-full h-20 pl-10 pr-24 bg-white fixed top-0 flex z-10 items-center cursor-pointer shadow-sm justify-between" >
                <Link className="text-3xl font-semibold text-blue-700" href={"/home"}>金点子”深海孵化器“</Link>
                <div className="flex gap-x-12">
                    <div className="flex gap-x-2">
                        <Search />
                        {isHomePage && <div className="pl-4 pr-4 h-14 bg-blue-700 flex justify-center items-center text-white text-xl rounded font-normal tracking-widest" onClick={handlePublishBtnCLick}>发表问题</div>}
                    </div>
                    <Image src={Avator} alt={"用户头像"} width={56} height={56} onClick={() => setAccountDropdownShow(!accountDropdownShow)} className="rounded" />
                </div>
            </div>
            {accountDropdownShow && <AccountDropdown />}
            <QuestionModal open={publishQuestionOpen} onCloseModal={() => setPublishQuestionOpen(false)} source={"publishQuestion"} onFetchNewQuestionDetail={foo} />
        </Fragment>
    )
}