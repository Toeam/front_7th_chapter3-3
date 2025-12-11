import { useCommentStore } from '../../../entities/comment'

/**
 * 댓글 삭제 기능
 * Store의 deleteComment를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const useCommentDelete = () => {
  const { deleteComment: deleteCommentInStore } = useCommentStore()

  const deleteComment = async (
    id: number,
    postId: number,
    onSuccess?: () => void
  ): Promise<void> => {
    try {
      // Store의 deleteComment 호출 (API 호출 + 상태 관리)
      await deleteCommentInStore(id, postId)
      onSuccess?.()
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      throw error
    }
  }

  return { deleteComment }
}

