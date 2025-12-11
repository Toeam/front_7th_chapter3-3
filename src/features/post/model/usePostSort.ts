import { useState } from 'react'

export type SortBy = 'none' | 'id' | 'title' | 'reactions'
export type SortOrder = 'asc' | 'desc'

export const usePostSort = () => {
  const [sortBy, setSortBy] = useState<SortBy>('none')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value)
  }

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value)
  }

  const resetSort = () => {
    setSortBy('none')
    setSortOrder('asc')
  }

  return {
    sortBy,
    sortOrder,
    setSortBy: handleSortByChange,
    setSortOrder: handleSortOrderChange,
    resetSort,
  }
}
