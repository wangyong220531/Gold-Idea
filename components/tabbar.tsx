"use client"
import { useState } from "react"

export interface TabItem {
    key: number
    content: string
}

const tablist: TabItem[] = [
    {
        key: 0,
        content: "最新"
    },
    {
        key: 1,
        content: "最热"
    }
]

export function TabBar() {

    const [activedTab, setActivedTab] = useState(0)

    return (
        <div className="flex items-center gap-x-2">
            {
                tablist.map((tab: TabItem) => {
                    return (
                        <div key={tab.key} className="flex items-center gap-x-2">
                            <div className={`text-xl cursor-pointer ${activedTab === tab.key ? "text-blue-600" : "text-gray-500"}`} onClick={() => setActivedTab(tab.key)}>{tab.content}</div>
                            {tab.key !== tablist.length - 1 && <div className="text-gray-500">|</div>}
                        </div>
                    )
                })
            }
        </div>
    )
}