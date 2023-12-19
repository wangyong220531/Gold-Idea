import { wyDeepClone } from "wangyong-utils"
import { CommentItem } from "../components/comments"

export default function commentPinnedSort(comments: CommentItem[]) {
    const commentCopy = wyDeepClone(comments)
    return commentCopy.sort((a, b) => {
        if (a.isPinned && !b.isPinned) {
            return -1
        }
        if (!a.isPinned && b.isPinned) {
            return 1
        }
        return 0
    })
}
