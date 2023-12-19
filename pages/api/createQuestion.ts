import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function createQuestion(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })

    const body = JSON.parse(req.body)
    const { content, goal, publisherId } = body

    if (content !== undefined && typeof content !== "string") return res.status(400).json({ message: "内容参数类型错误！" })
    if (goal !== undefined && typeof goal !== "string") return res.status(400).json({ message: "目的参数类型错误！" })
    if (publisherId !== undefined && typeof publisherId !== "number") return res.status(400).json({ message: "发布者id参数类型错误！" })

    try {
        const addRes = await prisma.question.create({ data: { content, goal, publisherId } })
        res.status(200).json(addRes)
    } catch (err) {
        res.status(400).json({ message: "创建问题出错！" })
    }
}
