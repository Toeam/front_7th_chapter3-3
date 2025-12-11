import { Search, ThumbsDown, ThumbsUp, MessageSquare, Edit2, Trash2 } from "lucide-react"
import type { Post, Tag } from '../../../entities/post'
import type { SortBy, SortOrder } from '../../../features/post'
import { highlightText } from '../../../shared/lib'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui"

interface PostListProps {
  // 데이터
  posts: Post[]
  tags: Tag[]
  loading: boolean
  
  // 필터/검색 상태
  searchQuery: string
  selectedTag: string
  sortBy: SortBy
  sortOrder: SortOrder
  
  // 페이지네이션
  skip: number
  limit: number
  total: number
  
  // 핸들러
  onSearchChange: (query: string) => void
  onSearch: () => void
  onTagChange: (tag: string) => void
  onSortByChange: (sortBy: SortBy) => void
  onSortOrderChange: (sortOrder: SortOrder) => void
  onLimitChange: (limit: number) => void
  onPrevPage: () => void
  onNextPage: () => void
  
  // 게시물 액션
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (postId: number) => void
  onUserClick: (author: Post['author']) => void
  onTagClick: (tag: string) => void
}

/**
 * 게시물 목록 위젯
 * 검색/필터 컨트롤과 게시물 테이블을 포함합니다.
 */
export const PostList = ({
  posts,
  tags,
  loading,
  searchQuery,
  selectedTag,
  sortBy,
  sortOrder,
  skip,
  limit,
  total,
  onSearchChange,
  onSearch,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
  onLimitChange,
  onPrevPage,
  onNextPage,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onUserClick,
  onTagClick,
}: PostListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* 검색 및 필터 컨트롤 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="게시물 검색..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
          </div>
        </div>
        <Select value={selectedTag} onValueChange={onTagChange}>
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
        <Select value={sortBy} onValueChange={onSortByChange}>
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
        <Select value={sortOrder} onValueChange={(value) => onSortOrderChange(value as SortOrder)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">오름차순</SelectItem>
            <SelectItem value="desc">내림차순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 게시물 테이블 */}
      {loading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[150px]">작성자</TableHead>
              <TableHead className="w-[150px]">반응</TableHead>
              <TableHead className="w-[150px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{highlightText(post.title, searchQuery)}</div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                            selectedTag === tag
                              ? "text-white bg-blue-500 hover:bg-blue-600"
                              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                          }`}
                          onClick={() => onTagClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => post.author && onUserClick(post.author)}
                  >
                    <img
                      src={post.author?.image}
                      alt={post.author?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{post.author?.username}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.reactions?.likes || 0}</span>
                    <ThumbsDown className="w-4 h-4" />
                    <span>{post.reactions?.dislikes || 0}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onPostDetail(post)}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onPostEdit(post)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onPostDelete(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* 페이지네이션 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>표시</span>
          <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
          <span>항목</span>
        </div>
        <div className="flex gap-2">
          <Button disabled={skip === 0} onClick={onPrevPage}>
            이전
          </Button>
          <Button disabled={skip + limit >= total} onClick={onNextPage}>
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}
