import { useCommentStore, type CreateCommentDto, type Comment } from '../../../entities/comment'

/**
 * 댓글 생성 기능
 * Store의 createComment를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const useCommentCreate = () => {
  const { createComment: createCommentInStore } = useCommentStore()

  const createComment = async (
    comment: CreateCommentDto,
    onSuccess?: (createdComment: Comment) => void
  ): Promise<Comment> => {
    try {
      // Store의 createComment 호출 (API 호출 + 상태 관리)
      const createdComment = await createCommentInStore(comment)
      onSuccess?.(createdComment)
      return createdComment
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      throw error
    }
  }

  return { createComment }
}

