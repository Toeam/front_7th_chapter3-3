import { usePostStore } from '../../../entities/post'

/**
 * 게시물 삭제 기능
 * Store의 deletePost를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const usePostDelete = () => {
  const { deletePost: deletePostInStore } = usePostStore()

  const deletePost = async (
    id: number,
    onSuccess?: () => void
  ): Promise<void> => {
    try {
      // Store의 deletePost 호출 (API 호출 + 상태 관리)
      await deletePostInStore(id)
      onSuccess?.()
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  }

  return { deletePost }
}
