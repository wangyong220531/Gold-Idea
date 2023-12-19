import { wyDeepClone } from "wangyong-utils"
import { CommentItem } from "../components/comments"

export default function traverseChildComments(comment: CommentItem) {
    const result: CommentItem = wyDeepClone(comment)
    result.childComments = wyDeepClone(processComments(flattenChildComments(result.childComments)))
    return result
}

function flattenChildComments(comments: CommentItem[]) {
    let flattenedComments: CommentItem[] = []

    for (const comment of comments) {
        flattenedComments.push(comment)
        if (comment.childComments && comment.childComments.length > 0) {
            const childComments = flattenChildComments(comment.childComments)
            flattenedComments = flattenedComments.concat(childComments)
        }
    }

    return flattenedComments
}


function processComments(comments: CommentItem[]) {
    // 将所有评论平铺到一个列表中，包括子评论
    const allComments: CommentItem[] = [];
    comments.forEach(comment => {
        allComments.push(comment);
        if (comment.childComments) {
            allComments.push(...comment.childComments);
        }
    });

    // 按 createTime 降序排序子评论
    allComments.forEach(comment => {
        if (comment.childComments) {
            comment.childComments.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());
        }
    });

    // 过滤出 id 和 parentId 相等的评论，并将其移至数组前面
    const pinnedComments = allComments.filter(comment => comment.id === comment.parentId);
    const otherComments = allComments.filter(comment => comment.id !== comment.parentId);

    // 合并并去除重复的评论
    const combinedComments = [...pinnedComments, ...otherComments];
    const uniqueComments = combinedComments.filter((comment, index, self) =>
        index === self.findIndex((t) => t.id === comment.id)
    );

    return uniqueComments;
}
