"use client"
import Image from 'next/image'
import WangYongAvator from '../assets/avator.jpg'
import { useUser } from '../app/lib/userContext'
import IPLocationIcon from "../assets/IPLocationIcon.png"

export default function PersonalInfoCard() {

    const { userInfo } = useUser()

    return <div className="w-[1200px] h-[800px] bg-white relative">
        <div className="w-full h-[300px] loginBG relative cursor-pointer">
            <div className="absolute right-4 bottom-4 text-gray-200 bg-black border-none bg-opacity-40 hover:bg-opacity-70 py-2 px-4 border border-gray-400 rounded shadow ip-backdrop-blur flex items-center gap-x-1">
                <Image src={IPLocationIcon} alt={'IP位置图标'} width={20} height={10} />
                <div>IP属地：洛杉矶</div>
            </div>
        </div>
        <div className='absolute left-10 top-[200px] border-8 border-white rounded-md'>
            <Image src={WangYongAvator} alt={'用户头像图片'} width={200} height={200} className='rounded-md' />
        </div>
        <div className='ml-[280px] mt-8 flex justify-between pr-10 items-center'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex items-center gap-x-4'>
                    <div className='text-4xl font-bold tracking-widest'>{userInfo.userName}</div>
                    <div className='bg-gray-400 px-2 py-1 text-white bg-gradient-to-r from-cyan-500 to-blue-500'>{userInfo.role.roleName}</div>
                </div>
                <div className='text-xl flex gap-x-4 text-gray-500'>
                    <div>警号：{userInfo.policeNo}</div>
                    <div>单位：{userInfo.unit.unitName}</div>
                    <div>手机号：{userInfo.phone}</div>
                </div>
            </div>
            <div className='h-[50px] w-[180px] flex justify-center items-center rounded border-blue-600 border-2 text-blue-600 text-xl cursor-pointer'>编辑个人资料</div>
        </div>
    </div>
}