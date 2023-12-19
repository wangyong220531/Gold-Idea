export interface Include {
    where: {
        deleted: boolean
    }
    include: {
        parent: {
            include: {
                publisher: {
                    include: {
                        unit: boolean
                    }
                }
            }
        }
        publisher: {
            include: {
                unit: boolean
            }
        }
        isHonoredBy: {
            include: {
                unit: boolean
            }
        }
        deletedBy: {
            include: {
                unit: boolean
            }
        }
        childComments: Include | true | null
    }
}

export default function generateInclude(depth: number): any {
    if (depth <= 0) return null
    return {
        where: {
            deleted: false
        },
        include: {
            parent: {
                include: {
                    publisher: {
                        include: {
                            unit: true
                        }
                    }
                }
            },
            publisher: {
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
            childComments: depth === 1 ? true : generateInclude(depth - 1)
        }
    }
}
