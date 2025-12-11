import { postApi, usePostStore, type UpdatePostDto, type Post } from '../../../entities/post'

export const usePostUpdate = () => {
  const { updatePostInStore, setLoading, setError } = usePostStore()

  const updatePost = async (
    id: number,
    post: UpdatePostDto,
    onSuccess?: (updatedPost: Post) => void
  ): Promise<Post> => {
    setLoading(true)
    setError(null)
    
    try {
      // API 호출
      const updatedPost = await postApi.updatePost(id, post)
      
      // Store 업데이트 (비즈니스 로직)
      updatePostInStore(id, updatedPost)
      
      setLoading(false)
      onSuccess?.(updatedPost)
      return updatedPost
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '게시물 수정에 실패했습니다'
      
      setError(errorMessage)
      setLoading(false)
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  }

  return { updatePost }
}

