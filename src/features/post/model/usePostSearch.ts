import { postApi, type PostsResponse } from '../../../entities/post'

export const usePostSearch = () => {
  const searchPosts = async (
    query: string,
    onSuccess?: (result: PostsResponse) => void
  ): Promise<PostsResponse> => {
    if (!query.trim()) {
      throw new Error('검색어를 입력해주세요')
    }

    try {
      const result = await postApi.searchPosts(query)
      onSuccess?.(result)
      return result
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      throw error
    }
  }

  return { searchPosts }
}
