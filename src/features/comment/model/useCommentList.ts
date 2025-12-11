import { useCommentStore } from '../../../entities/comment'

/**
 * 댓글 목록 조회 기능
 * Store의 fetchCommentsByPost를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const useCommentList = () => {
  const { fetchCommentsByPost: fetchCommentsByPostInStore, comments } = useCommentStore()

  const fetchComments = async (postId: number) => {
    // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    if (comments[postId]) {
      return
    }

    try {
      // Store의 fetchCommentsByPost 호출 (API 호출 + 상태 관리)
      await fetchCommentsByPostInStore(postId)
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
      throw error
    }
  }

  return { fetchComments, comments }
}

