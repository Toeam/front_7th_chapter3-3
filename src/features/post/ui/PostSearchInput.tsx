import { Search } from "lucide-react"
import { Input } from '../../../shared/ui'
import { usePostFilters } from '../model/usePostFilters'
import { usePostSearch } from '../model/usePostSearch'

/**
 * 게시물 검색 입력 컴포넌트
 * 검색어 입력과 검색 실행을 처리합니다.
 */
export const PostSearchInput = () => {
  const { searchQuery, setSearchQuery, syncURL } = usePostFilters()
  const { searchPosts } = usePostSearch()

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return
    }
    await searchPosts(searchQuery)
    syncURL()
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </div>
  )
}

