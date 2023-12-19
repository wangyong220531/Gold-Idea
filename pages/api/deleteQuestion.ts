import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function DeleteQuestion(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { questionId, userId } = body

    try {
        const deleteRes = await prisma.question.update({
            where: {
                id: questionId
            },
            data: {
                deleted: true,
                deletedBy: { connect: { id: userId } }
            }
        })
        if (!deleteRes) return res.status(404).json({ message: "删除问题出错！" })
        res.status(200).json(deleteRes)
    } catch (err) {
        res.status(400).json({ message: "删除问题出错！" })
    }
}
