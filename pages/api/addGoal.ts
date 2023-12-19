import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function addGoal(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { questionId, goal, publisherId } = body

    if (questionId !== undefined && typeof questionId !== "number") return res.status(400).json({ message: "问题id参数类型错误！" })
    if (goal !== undefined && typeof goal !== "string") return res.status(400).json({ message: "目的参数类型错误！" })
    if (publisherId !== undefined && typeof publisherId !== "number") return res.status(400).json({ message: "发布者id参数类型错误！" })

    try {
        const addGoalRes = await prisma.question.update({
            where: { id: questionId },
            data: { goal, publisherId }
        })
        res.status(200).json(addGoalRes)
    } catch (err) {
        res.status(400).json({ message: "创建目的出错！" })
    }
}
