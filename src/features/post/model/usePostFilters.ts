import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getNumberParam, getStringParam, updateURL } from '../../../shared/lib/urlUtils'
import { PAGINATION, SORT } from '../../../shared/config/constants'
import { usePostSort } from './usePostSort'

/**
 * 게시물 필터링 기능
 * URL 파라미터와 동기화된 필터 상태를 관리합니다.
 * usePostSort를 내부적으로 사용하여 정렬 상태도 함께 관리합니다.
 */
export const usePostFilters = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 정렬 기능 사용
  const sort = usePostSort()

  // URL 파라미터에서 초기값 가져오기
  const [skip, setSkip] = useState(() => getNumberParam(location.search, "skip", PAGINATION.DEFAULT_SKIP))
  const [limit, setLimit] = useState(() => getNumberParam(location.search, "limit", PAGINATION.DEFAULT_LIMIT))
  const [searchQuery, setSearchQuery] = useState(() => getStringParam(location.search, "search"))
  const [selectedTag, setSelectedTag] = useState(() => getStringParam(location.search, "tag"))

  // URL 파라미터 동기화
  const syncURL = () => {
    updateURL(navigate, location.pathname, {
      skip,
      limit,
      search: searchQuery || null,
      sortBy: sort.sortBy !== "none" ? sort.sortBy : null,
      sortOrder: sort.sortOrder !== "asc" ? sort.sortOrder : null,
      tag: selectedTag || null,
    })
  }

  // URL 파라미터 변경 감지
  useEffect(() => {
    const skipValue = getNumberParam(location.search, "skip", PAGINATION.DEFAULT_SKIP)
    const limitValue = getNumberParam(location.search, "limit", PAGINATION.DEFAULT_LIMIT)
    const searchValue = getStringParam(location.search, "search")
    const urlSortBy = getStringParam(location.search, "sortBy", SORT.DEFAULT_SORT_BY)
    const urlSortOrder = getStringParam(location.search, "sortOrder", SORT.DEFAULT_SORT_ORDER)
    const tagValue = getStringParam(location.search, "tag")
    
    setSkip(skipValue)
    setLimit(limitValue)
    setSearchQuery(searchValue)
    if (urlSortBy) sort.setSortBy(urlSortBy as typeof sort.sortBy)
    if (urlSortOrder) sort.setSortOrder(urlSortOrder as typeof sort.sortOrder)
    setSelectedTag(tagValue)
  }, [location.search, sort])

  return {
    // 상태
    skip,
    limit,
    searchQuery,
    selectedTag,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
    
    // 상태 변경 함수
    setSkip,
    setLimit,
    setSearchQuery,
    setSelectedTag,
    setSortBy: sort.setSortBy,
    setSortOrder: sort.setSortOrder,
    
    // 정렬 기능
    sortPosts: sort.sortPosts,
    
    // URL 동기화
    syncURL,
  }
}
