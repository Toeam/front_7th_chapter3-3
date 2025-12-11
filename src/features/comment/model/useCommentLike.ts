import { useCommentStore, type Comment } from '../../../entities/comment'

/**
 * 댓글 좋아요 기능
 * Store의 likeComment를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const useCommentLike = () => {
  const { likeComment: likeCommentInStore, comments } = useCommentStore()

  const likeComment = async (
    id: number,
    postId: number,
    onSuccess?: (updatedComment: Comment) => void
  ): Promise<Comment> => {
    try {
      // 현재 좋아요 수 가져오기
      const currentComment = comments[postId]?.find((c) => c.id === id)
      if (!currentComment) {
        throw new Error('댓글을 찾을 수 없습니다')
      }

      // Store의 likeComment 호출 (API 호출 + 상태 관리)
      const updatedComment = await likeCommentInStore(
        id,
        postId,
        currentComment.likes
      )
      onSuccess?.(updatedComment)
      return updatedComment
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      throw error
    }
  }

  return { likeComment }
}

