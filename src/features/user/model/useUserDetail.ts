import { useUserStore, type User } from '../../../entities/user'

/**
 * 사용자 상세 정보 조회 기능
 * Store의 fetchUser를 사용하여 API 호출과 상태 관리를 처리합니다.
 */
export const useUserDetail = () => {
  const { fetchUser: fetchUserInStore, selectedUser, loading, error } = useUserStore()

  const fetchUser = async (
    id: number,
    onSuccess?: (user: User) => void
  ): Promise<User> => {
    try {
      // Store의 fetchUser 호출 (API 호출 + 상태 관리)
      const user = await fetchUserInStore(id)
      onSuccess?.(user)
      return user
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
      throw error
    }
  }

  return { fetchUser, selectedUser, loading, error }
}

