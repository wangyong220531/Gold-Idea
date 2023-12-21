"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '../app/lib/userContext';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaTimeout, setCaptchaTimeout] = useState(0)
    const [captchaButtonDisabled, setCaptchaButtonDisabled] = useState(false)
    const router = useRouter()
    const { updatePoliceNo } = useUser()

    useEffect(() => {
        if (captchaTimeout > 0 && captchaTimeout < 60) {
            setCaptchaButtonDisabled(true)
        }
        if (captchaTimeout === 0) {
            setCaptchaButtonDisabled(false)
            return
        }
        const timer = setTimeout(() => {
            setCaptchaTimeout(t => t - 1)
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [captchaTimeout])

    async function queryCaptcha() {
        setCaptchaTimeout(60)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const res =  updatePoliceNo(username)
        // if(!res) return
        router.push("/home")
    };

    return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-y-16 bg-white p-[100px]'>
            <div className='text-blue-600 text-5xl font-extrabold'>金点子”深海孵化器“</div>
            <form className='flex flex-col gap-y-10' onSubmit={handleSubmit}>
                <div className='flex items-center'>
                    <label htmlFor="username" className='w-[100px] text-3xl text-align-last-justify'>用户名</label>
                    <div className='text-3xl'>：</div>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete='off'
                        className='w-[400px] h-[50px] focus:outline-none p-4 border-b-2'
                    />
                </div>
                <div className='flex items-center'>
                    <label htmlFor="password" className='w-[100px] text-3xl text-align-last-justify'>验证码</label>
                    <div className='text-3xl'>：</div>
                    <div className='w-[400px] flex justify-between'>
                        <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='off'
                            className='w-[200px] h-[50px] focus:outline-none p-4 border-b-2'
                        />
                        <button disabled={captchaButtonDisabled} className='w-[180px] h-[50px] flex justify-center items-center border-2 border-blue-600 cursor-pointer text-xl text-blue-600' onClick={queryCaptcha}>{captchaTimeout === 0 ? "获取验证码" : `${captchaTimeout}s后重新获取`}</button >
                    </div>
                </div>
                <button type="submit" className='text-2xl bg-blue-600 text-white tracking-widest font-bold py-4 mt-4'>登录</button>
            </form>
        </div>
    );
}
