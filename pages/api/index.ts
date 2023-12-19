import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

export async function pagingRequest(pageNo: number, pageSize: number) {
    const res = await fetch("/api/pagingRequest", {
        method: "POST",
        body: JSON.stringify({
            pageNo,
            pageSize
        })
    })
    if (res.status !== 200) throw new Error("问题分页请求出错！")
    const data = await res.json()
    return data
}

export async function addQuestion(content: string, publisherId: number) {
    const res = await fetch("/api/createQuestion", {
        method: "POST",
        body: JSON.stringify({
            content,
            publisherId
        })
    })
    if (res.status !== 200) throw new Error("创建问题出错！")
    const data = await res.json()
    return data
}

export async function addGoal(questionId: number, goal: string, publisherId: number) {
    const res = await fetch("/api/addGoal", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            goal,
            publisherId
        })
    })
    if (res.status !== 200) throw new Error("创建目的出错！")
    const data = await res.json()
    return data
}

export async function addComment(questionId: number, content: string, publisherId: number, parentId?: number) {
    const res = await fetch("/api/addComment", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            content,
            publisherId,
            parentId
        })
    })
    if (res.status !== 200) throw new Error("添加评论出错！")
    const data = await res.json()
    return data
}

export async function addReply(commentId: number, content: string, publisherId: number) {
    const res = await fetch("/api/addReply", {
        method: "POST",
        body: JSON.stringify({
            commentId,
            content,
            publisherId
        })
    })
    if (res.status !== 200) throw new Error("添加回复出错！")
    const data = await res.json()
    return data
}

export async function collectQuestion(questionId: number, userId: number, isCollected: boolean) {
    const res = await fetch("/api/collectQuestion", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            userId,
            isCollected
        })
    })
    if (res.status !== 200) throw new Error("收藏问题出错！")
    const data = await res.json()
    return data
}

export async function attentionQuestion(questionId: number, userId: number, isAttentioned: boolean) {
    const res = await fetch("/api/attentionQuestion", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            userId,
            isAttentioned
        })
    })
    if (res.status !== 200) throw new Error("关注问题出错！")
    const data = await res.json()
    return data
}

export async function deleteQuestion(questionId: number, userId: number) {
    const res = await fetch("/api/deleteQuestion", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            userId
        })
    })
    if (res.status !== 200) throw new Error("删除问题出错！")
    const data = await res.json()
    return data
}

export async function toTopComment(questionId: number, commentId: number, pinNote: string, userId: number) {
    const res = await fetch("/api/toTopComment", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            commentId,
            pinNote,
            userId
        })
    })
    if (res.status !== 200) throw new Error("置顶评论出错！")
    const data = await res.json()
    return data
}

export async function toHonorComment(questionId: number, commentId: number, honorNote: string, userId: number, honorStatus: boolean) {
    const res = await fetch("/api/toHonorComment", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            commentId,
            honorNote,
            userId,
            honorStatus
        })
    })
    if (res.status !== 200) throw new Error("评优评论出错！")
    const data = await res.json()
    return data
}

export async function editQuestion(questionId: number, content: string, goal: string) {
    const res = await fetch("/api/editQuestion", {
        method: "POST",
        body: JSON.stringify({
            questionId,
            content,
            goal
        })
    })
    if (res.status !== 200) throw new Error("修改问题出错！")
    const data = await res.json()
    return data
}
