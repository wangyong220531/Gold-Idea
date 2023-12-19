"use client"
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import UserContext from '../app/lib/userContext';
import Avator from "../assets/avator.jpg"

const userDemo = {
    id: 1,
    avator: Avator,
    userName: "王勇",
    policeNo: "082xxx",
    phone: "19942372693",
    unitId: "黄码派出所",
    commentId: 1,
    unit: {
        id: 1,
        unitNo: "0000",
        unitName: "黄码派出所"
    }
}

export default function UserProvider({ children }: { children: React.ReactNode }) {

    const { mutate } = useSWRConfig();

    useEffect(() => {
    }, []);

    return <UserContext.Provider value={{ userInfo: userDemo }}>{children}</UserContext.Provider>;
};

