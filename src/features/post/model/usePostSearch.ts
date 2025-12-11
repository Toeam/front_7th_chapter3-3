import { usePostStore } from '../../../entities/post'

/**
 * 게시물 검색 기능
 * Store의 searchPosts를 사용하여 API 호출과 상태 관리를 처리합니다.
 * 추가적인 검색 로직(검색어 전처리 등)이 필요한 경우 여기에 작성합니다.
 */
export const usePostSearch = () => {
  const { searchPosts: searchPostsInStore } = usePostStore()

  const searchPosts = async (query: string) => {
    if (!query.trim()) {
      throw new Error('검색어를 입력해주세요')
    }

    try {
      // Store의 searchPosts 호출 (API 호출 + 상태 관리)
      await searchPostsInStore(query)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      throw error
    }
  }

  return { searchPosts }
}
