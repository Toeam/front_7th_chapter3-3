import { useCommentStore, type UpdateCommentDto, type Comment } from '../../../entities/comment'

/**
 * 댓글 수정 기능
 * Store의 updateComment를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const useCommentUpdate = () => {
  const { updateComment: updateCommentInStore } = useCommentStore()

  const updateComment = async (
    id: number,
    comment: UpdateCommentDto,
    onSuccess?: (updatedComment: Comment) => void
  ): Promise<Comment> => {
    try {
      // Store의 updateComment 호출 (API 호출 + 상태 관리)
      const updatedComment = await updateCommentInStore(id, comment)
      onSuccess?.(updatedComment)
      return updatedComment
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
      throw error
    }
  }

  return { updateComment }
}

