import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function toTopComment(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { questionId, commentId, pinNote, userId } = body

    if (questionId !== undefined && typeof questionId !== "number") return res.status(400).json({ message: "问题id参数类型错误！" })
    if (commentId !== undefined && typeof commentId !== "number") return res.status(400).json({ message: "评论id参数类型错误！" })
    if (pinNote !== undefined && typeof pinNote !== "string") return res.status(400).json({ message: "置顶备注参数类型错误！" })
    if (userId !== undefined && typeof userId !== "number") return res.status(400).json({ message: "用户id参数类型错误！" })

    try {
        const toTopCommentRes = await prisma.comment.update({
            where: {
                id: commentId,
                questionId
            },
            data: {
                isPinned: true,
                pinNote,
                pinnedUserId: userId
            }
        })
        const switchOtherTopStatusRes = await prisma.comment.updateMany({
            where: {
                questionId,
                id: {
                    not: commentId
                }
            },
            data: {
                isPinned: false,
                pinNote: null,
                pinnedUserId: null
            }
        })
        if (!toTopCommentRes && !switchOtherTopStatusRes) return
        res.status(200).json({ message: "置顶成功！" })
    } catch (error) {
        res.status(400).json({ message: "置顶评论出错！" + error })
    }
}
