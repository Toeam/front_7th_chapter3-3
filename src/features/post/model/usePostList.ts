import { usePostStore } from '../../../entities/post'
import { userApi } from '../../../entities/user'
import type { Post, PostAuthor } from '../../../entities/post'

/**
 * 게시물 목록 조회 기능
 * Store의 fetchPosts를 호출하고, users API를 함께 호출하여 author 정보를 매핑합니다.
 * (기획 변경에 영향받는 로직이므로 Features에 위치)
 */
export const usePostList = () => {
  const { fetchPosts: fetchPostsInStore, setPosts, setLoading, setError } = usePostStore()

  const fetchPosts = async (limit: number, skip: number) => {
    setLoading(true)
    setError(null)

    try {
      // 게시물과 사용자 정보를 병렬로 가져오기
      const [postsResponse, usersResponse] = await Promise.all([
        fetchPostsInStore(limit, skip), // Store에서 Post API 호출
        userApi.getUsers({ limit: 0, select: 'username,image' }), // User API 호출
      ])

      // author 정보 매핑 (비즈니스 로직)
      const postsWithAuthors: Post[] = postsResponse.posts.map((post) => {
        const user = usersResponse.users.find((u) => u.id === post.userId)
        const author: PostAuthor | undefined = user
          ? {
              id: user.id,
              username: user.username,
              image: user.image,
            }
          : undefined

        return {
          ...post,
          author,
        }
      })

      // Store에 매핑된 결과 저장
      setPosts(postsWithAuthors)
      setLoading(false)
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '게시물을 불러오는데 실패했습니다'
      
      setError(errorMessage)
      setLoading(false)
      console.error("게시물 가져오기 오류:", error)
      throw error
    }
  }

  return { fetchPosts }
}

