import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."
import generateInclude from "../../utils/generateInclude"

export default async function findQuestionByID(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ message: "请求方式出错！" })
    const { id } = req.query

    if (id !== undefined && typeof id !== "string") return res.status(400).json({ message: "请求参数错误！" })

    try {
        const findRes = await prisma.question.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                publisher: {
                    include: {
                        unit: true
                    }
                },
                comments: {
                    where: {
                        deleted: false
                    },
                    include: {
                        publisher: {
                            include: {
                                unit: true
                            }
                        },
                        parent: {
                            include: {
                                publisher: {
                                    include: {
                                        unit: true
                                    }
                                }
                            }
                        },
                        isPinnedBy: {
                            include: {
                                unit: true
                            }
                        },
                        isHonoredBy: {
                            include: {
                                unit: true
                            }
                        },
                        deletedBy: {
                            include: {
                                unit: true
                            }
                        },
                        childComments: generateInclude(20)
                    }
                },
                collections: true,
                attentions: true
            }
        })
        if (!findRes) return res.status(404).json({ message: "找不到问题！" })
        res.status(200).json(findRes)
    } catch (err) {
        res.status(400).json({ message: "获取问题出错！" })
    }
}
