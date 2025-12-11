import type { Post } from '../../../entities/post'
import type { Comment } from '../../../entities/comment'
import { CommentList } from '../../comment-list'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"

interface PostDetailProps {
  post: Post | null
  comments: Comment[]
  searchQuery?: string
  isOpen: boolean
  onClose: () => void
  onAddComment: () => void
  onLikeComment: (commentId: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number, postId: number) => void
}

/**
 * 게시물 상세 위젯
 * 게시물 상세 정보와 댓글 목록을 표시합니다.
 */
export const PostDetail = ({
  post,
  comments,
  searchQuery = "",
  isOpen,
  onClose,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: PostDetailProps) => {
  // 검색어 하이라이트
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
        )}
      </span>
    )
  }

  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
          <CommentList
            comments={comments}
            postId={post.id}
            searchQuery={searchQuery}
            onAddComment={onAddComment}
            onLikeComment={onLikeComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

