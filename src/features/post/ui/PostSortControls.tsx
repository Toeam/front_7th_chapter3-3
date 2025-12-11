import type { SortBy, SortOrder } from '../model/usePostSort'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui'
import { usePostFilters } from '../model/usePostFilters'

/**
 * 게시물 정렬 컨트롤 컴포넌트
 * 정렬 기준과 정렬 순서를 선택합니다.
 */
export const PostSortControls = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = usePostFilters()

  return (
    <>
      <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

