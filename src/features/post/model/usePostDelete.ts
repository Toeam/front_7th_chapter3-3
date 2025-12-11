import { postApi, usePostStore } from '../../../entities/post'

export const usePostDelete = () => {
  const { removePost, setLoading, setError } = usePostStore()

  const deletePost = async (
    id: number,
    onSuccess?: () => void
  ): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      // API 호출
      await postApi.deletePost(id)
      
      // Store 업데이트 (비즈니스 로직)
      removePost(id)
      
      setLoading(false)
      onSuccess?.()
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '게시물 삭제에 실패했습니다'
      
      setError(errorMessage)
      setLoading(false)
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  }

  return { deletePost }
}
