import { usePostStore, type UpdatePostDto, type Post } from '../../../entities/post'

/**
 * 게시물 수정 기능
 * Store의 updatePost를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const usePostUpdate = () => {
  const { updatePost: updatePostInStore } = usePostStore()

  const updatePost = async (
    id: number,
    post: UpdatePostDto,
    onSuccess?: (updatedPost: Post) => void
  ): Promise<Post> => {
    try {
      // Store의 updatePost 호출 (API 호출 + 상태 관리)
      const updatedPost = await updatePostInStore(id, post)
      onSuccess?.(updatedPost)
      return updatedPost
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  }

  return { updatePost }
}

