import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function editQuestion(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { questionId, content, goal } = body

    try {
        const updateQuestionRes = await prisma.question.update({
            where: {
                id: questionId
            },
            data: {
                content,
                goal
            }
        })
        if (!updateQuestionRes) return
        res.status(200).json({ message: "更新问题成功！" })
    } catch (error) {
        res.status(400).json({ message: "更新问题出错！" })
    }
}
