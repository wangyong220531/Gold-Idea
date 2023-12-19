"use client"
import { useState } from "react"

export interface SortItemChild {
    key: number,
    content: string
}

export interface SortItem {
    id: number
    label: string
    children: SortItemChild[]
}

const sortList: SortItem[] = [
    {
        id: 0,
        label: "排序",
        children: [
            {
                key: 0,
                content: "按关注数量"
            },
            {
                key: 1,
                content: "按收藏数量"
            },
            {
                key: 2,
                content: "按留言数量"
            }
        ]
    },
    {
        id: 1,
        label: "筛选",
        children: [
            {
                key: 0,
                content: "近一周内"
            },
            {
                key: 1,
                content: "近一月内"
            },
            {
                key: 2,
                content: "近一年内"
            }
        ]
    }
]

export interface DrainageProps {
    onSortChange: (firstKey: number, secondKey: number) => void
}

export default function Drainage(props: DrainageProps) {

    const { onSortChange } = props

    const [sortActivedChild, setSortActivedChild] = useState(0)
    const [filterActivedChild, setFilterActivedChild] = useState(0)

    function firstSectionClick(key: number) {
        setSortActivedChild(key)
        onSortChange(key, filterActivedChild)
    }

    function secondSectionClick(key: number) {
        setFilterActivedChild(key)
        onSortChange(sortActivedChild, key)
    }

    return (
        <div className="w-2/12 h-drainage sticky top-[104px] bg-white shadow-sm">
            {sortList.map((sortItem: SortItem) => {
                return (
                    <div className="flex flex-col gap-y-2" key={sortItem.id}>
                        <div className="text-2xl font-bold px-6 pt-5 pb-3 border-b-[1px] border-gray-300 cursor-pointer">{sortItem.label}</div>
                        {sortItem.id === 0 && <div className="flex flex-col gap-y-2 px-3 py-3">
                            {sortItem.children.map((child: SortItemChild) => <div key={child.key} onClick={() => firstSectionClick(child.key)} className={`px-6 py-2 text-xl rounded cursor-pointer ${sortActivedChild === child.key ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-500'}`}>{child.content}</div>)}
                        </div>}
                        {sortItem.id === 1 && <div className="flex flex-col gap-y-2 px-3 py-3">
                            {sortItem.children.map((child: SortItemChild) => <div key={child.key} onClick={() => secondSectionClick(child.key)} className={`px-6 py-2 text-xl rounded cursor-pointer ${filterActivedChild === child.key ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-500'}`}>{child.content}</div>)}
                        </div>}
                    </div>
                )
            })}
        </div>
    )
}