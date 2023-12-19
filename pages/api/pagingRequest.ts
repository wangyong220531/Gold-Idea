import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function pagingRequest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })

    const body = JSON.parse(req.body)
    const { pageNo, pageSize } = body

    if (pageNo !== undefined && typeof pageNo !== "number") return res.status(400).json({ message: "页序号参数类型错误！" })
    if (pageSize !== undefined && typeof pageSize !== "number") return res.status(400).json({ message: "页大小参数类型错误！" })

    const skip = (pageNo - 1) * pageSize
    const take = pageSize

    try {
        const pagingRequestRes = await prisma.question.findMany({
            skip,
            take,
            where: {
                deleted: false
            },
            include: {
                publisher: {
                    include: {
                        unit: true
                    }
                },
                comments: true,
                collections: true,
                attentions: true,
                deletedBy: {
                    include: {
                        unit: true
                    }
                }
            }
        })
        if (!pagingRequestRes) return
        res.status(200).json(pagingRequestRes)
    } catch (error) {
        res.status(400).json({ message: "分页请求出错！" })
    }
}
