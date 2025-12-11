import { postApi, usePostStore, type CreatePostDto, type Post } from '../../../entities/post'

export const usePostCreate = () => {
  const { addPost, setLoading, setError } = usePostStore()

  const createPost = async (
    post: CreatePostDto,
    onSuccess?: (createdPost: Post) => void
  ): Promise<Post> => {
    setLoading(true)
    setError(null)
    
    try {
      // API 호출
      const createdPost = await postApi.createPost(post)
      
      // Store 업데이트 (비즈니스 로직)
      addPost(createdPost)
      
      setLoading(false)
      onSuccess?.(createdPost)
      return createdPost
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '게시물 생성에 실패했습니다'
      
      setError(errorMessage)
      setLoading(false)
      console.error("게시물 추가 오류:", error)
      throw error
    }
  }

  return { createPost }
}

