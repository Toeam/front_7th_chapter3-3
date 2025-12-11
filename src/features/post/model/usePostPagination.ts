import { PAGINATION } from '../../../shared/config/constants'

/**
 * 게시물 페이지네이션 기능
 * 페이지네이션 관련 로직을 관리합니다.
 */
export const usePostPagination = (
  skip: number,
  limit: number,
  total: number,
  setSkip: (skip: number) => void,
  setLimit: (limit: number) => void,
  syncURL: () => void
) => {
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setSkip(0)
    syncURL()
  }

  const handlePrevPage = () => {
    const newSkip = Math.max(0, skip - limit)
    setSkip(newSkip)
    syncURL()
  }

  const handleNextPage = () => {
    const newSkip = skip + limit
    setSkip(newSkip)
    syncURL()
  }

  const canGoPrev = skip > 0
  const canGoNext = skip + limit < total

  return {
    handleLimitChange,
    handlePrevPage,
    handleNextPage,
    canGoPrev,
    canGoNext,
    limitOptions: PAGINATION.LIMIT_OPTIONS,
  }
}

