import type { Tag } from '../../../entities/post'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui'
import { usePostFilters } from '../model/usePostFilters'

interface PostTagFilterProps {
  tags: Tag[]
}

/**
 * 게시물 태그 필터 컴포넌트
 * 태그를 선택하여 게시물을 필터링합니다.
 */
export const PostTagFilter = ({ tags }: PostTagFilterProps) => {
  const { selectedTag, setSelectedTag, syncURL } = usePostFilters()

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    syncURL()
  }

  return (
    <Select value={selectedTag || "all"} onValueChange={handleTagChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

