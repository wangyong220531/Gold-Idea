import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function addReply(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { commentId, content, publisherId } = body

    if (commentId !== undefined && typeof commentId !== "number") return res.status(400).json({ message: "问题id参数类型错误！" })
    if (content !== undefined && typeof content !== "string") return res.status(400).json({ message: "内容参数类型错误！" })
    if (publisherId !== undefined && typeof publisherId !== "number") return res.status(400).json({ message: "发布者id参数类型错误！" })

    try {
        const addReplyRes = await prisma.reply.create({
            data: {
                commentId,
                content,
                publisherId
            }
        })
        res.status(200).json(addReplyRes)
    } catch (err) {
        res.status(400).json({ message: "添加回复出错！" + err })
    }
}
