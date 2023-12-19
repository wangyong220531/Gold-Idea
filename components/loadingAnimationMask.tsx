"use client"
import { Spin } from "antd";
import { Fragment, useEffect } from "react";

export interface LoadingAnimationMaskProps {
    open: boolean
}

export default function LoadingAnimationMask(props: LoadingAnimationMaskProps) {

    const { open } = props

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
    }, [])

    return <Fragment>
        {open && <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-10" >
            <Spin size="large" className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>}
    </Fragment>
}