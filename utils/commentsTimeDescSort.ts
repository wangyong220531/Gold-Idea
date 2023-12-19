import { wyDeepClone } from "wangyong-utils"
import { CommentItem } from "../components/comments"
import dayjs from "dayjs"

export default function commentsTimeDescSort(comments: CommentItem[]) {
    const commentsDeepCopy = wyDeepClone(comments)
    const result = commentsDeepCopy.sort((a: CommentItem, b: CommentItem) => {
        return dayjs(b.createTime).unix() - dayjs(a.createTime).unix()
    })
    return result
}
