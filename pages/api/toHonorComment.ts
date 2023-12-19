import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function toHonorComment(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { questionId, commentId, honorNote, userId, honorStatus } = body

    if (questionId !== undefined && typeof questionId !== "number") return res.status(400).json({ message: "问题id参数类型错误！" })
    if (commentId !== undefined && typeof commentId !== "number") return res.status(400).json({ message: "评论id参数类型错误！" })
    if (honorNote !== undefined && typeof honorNote !== "string") return res.status(400).json({ message: "评优备注参数类型错误！" })
    if (userId !== undefined && typeof userId !== "number") return res.status(400).json({ message: "用户id参数类型错误！" })
    if (honorStatus !== undefined && typeof honorStatus !== "boolean") return res.status(400).json({ message: "评优状态参数类型错误！" })

    try {
        if (honorStatus) {
            const toCancelHonorCommentRes = await prisma.comment.update({
                where: {
                    id: commentId,
                    questionId
                },
                data: {
                    isHonored: false,
                    honorNote: null,
                    honoredUserId: null
                }
            })
            if (!toCancelHonorCommentRes) return
            res.status(200).json({ message: "取消评优成功！" })
            return
        }
        const toHonorCommentRes = await prisma.comment.update({
            where: {
                id: commentId,
                questionId
            },
            data: {
                isHonored: true,
                honorNote,
                honoredUserId: userId
            }
        })
        if (!toHonorCommentRes) return
        res.status(200).json({ message: "评优成功！" })
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: "评论评优出错！" + error })
    }
}
