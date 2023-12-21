"use client"
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import UserContext from '../app/lib/userContext';
import { User } from './detailFirstSection';
import Avtor from "../assets/avator.jpg"

const fetcher = async ({ url, policeNo }: { url: string, policeNo: string }) => {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ policeNo })
    });
    if (res.status !== 200) throw new Error("获取用户信息出错！")
    const data = await res.json()
    return data
}

const userInfo: User = {
    id: 1,
    avator: Avtor,
    userName: "王勇",
    policeNo: "082111",
    phone: "12345678901",
    unitId: 1,
    commentId: 1,
    unit: {
        id: 1,
        unitName: "黄码派出所",
        unitNo: "12333"
    },
    role: {
        id: 1,
        roleName: "普通民警",
        alias: "ORDINARY_POLICE",
        isDeleted: false
    }
}


export default function UserProvider({ children }: { children: React.ReactNode }) {

    const [policeNo, setPoliceNo] = useState("")
    const { data, error } = useSWR({ url: '/api/fetchUserInfo', policeNo }, fetcher)
    const { mutate } = useSWRConfig();

    useEffect(() => {
    }, [data, error]);

    function updatePoliceNo(newPoliceNo: string) {
        setPoliceNo(newPoliceNo)
        return data
    }

    return <UserContext.Provider value={{ userInfo: userInfo, updatePoliceNo }}>{children}</UserContext.Provider>;
}

