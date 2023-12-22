"use client"
import { useState } from "react"

export interface TabListItem {
    id: number
    label: string
    count: number
}

const tabList: TabListItem[] = [
    {
        id: 0,
        label: "动态",
        count: 0
    },
    {
        id: 1,
        label: "回答",
        count: 0
    },
    {
        id: 2,
        label: "提问",
        count: 0
    },
    {
        id: 3,
        label: "关注",
        count: 0
    },
    {
        id: 4,
        label: "收藏",
        count: 0
    }
]

export default function TabList() {

    const [activedTabId, setActivedTabId] = useState(0)

    return <div className="flex gap-x-6">
        {tabList.map((item: TabListItem) => <div className={`text-2xl cursor-pointer px-1 flex gap-x-2 ${activedTabId === item.id ? "border-b-4 border-blue-500 text-blue-500 font-semibold" : "text-gray-500 "}`} key={item.id} onClick={() => setActivedTabId(item.id)}>
            <div>{item.label}</div>
            <div>{item.count}</div>
        </div>)}
    </div>
}