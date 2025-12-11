import { usePostStore, type CreatePostDto, type Post } from '../../../entities/post'

/**
 * 게시물 생성 기능
 * Store의 createPost를 사용하여 API 호출과 상태 관리를 처리합니다.
 * 추가적인 비즈니스 로직(검증, 변환 등)이 필요한 경우 여기에 작성합니다.
 */
export const usePostCreate = () => {
  const { createPost: createPostInStore } = usePostStore()

  const createPost = async (
    post: CreatePostDto,
    onSuccess?: (createdPost: Post) => void
  ): Promise<Post> => {
    try {
      // Store의 createPost 호출 (API 호출 + 상태 관리)
      const createdPost = await createPostInStore(post)
      onSuccess?.(createdPost)
      return createdPost
    } catch (error) {
      console.error("게시물 추가 오류:", error)
      throw error
    }
  }

  return { createPost }
}

