import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function DeleteComment(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { commentIdList, userId } = body

    if (commentIdList !== undefined && !Array.isArray(commentIdList)) return res.status(400).json({ message: "请求参数错误！" })
    if (userId !== undefined && typeof userId !== "number") return res.status(400).json({ message: "请求参数错误！" })

    try {
        const deleteRes = await prisma.comment.updateMany({
            where: {
                id: {
                    in: commentIdList
                }
            },
            data: {
                deleted: true,
                deletedByUserId: userId
            }
        })
        if (!deleteRes) return res.status(404).json({ message: "删除评论出错！" })
        res.status(200).json(deleteRes)
    } catch (err) {
        res.status(400).json({ message: "删除评论出错！" })
    }
}
