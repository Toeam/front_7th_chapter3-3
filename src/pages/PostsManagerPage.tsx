import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"

// Entities - Store
import { usePostStore } from "../entities/post"
import { useCommentStore } from "../entities/comment"
import { useUserStore } from "../entities/user"

// Features
import {
  usePostList,
  usePostSearch,
  useTagFilter,
  usePostCreate,
  usePostUpdate,
  usePostDelete,
  usePostFilters,
  usePostPagination,
  usePostCreateModal,
  usePostEditModal,
  usePostDetailModal,
} from "../features/post"
import {
  useCommentList,
  useCommentCreate,
  useCommentUpdate,
  useCommentDelete,
  useCommentLike,
} from "../features/comment"
import { useUserDetail, useUserModal } from "../features/user"

// Widgets
import { PostList } from "../widgets/post-list"
import { PostDetail } from "../widgets/post-detail"
import { PostCreateModal } from "../widgets/post-create-modal"
import { PostEditModal } from "../widgets/post-edit-modal"
import { UserModal } from "../widgets/user-modal"

// Types
import type { Comment } from "../entities/comment"

const PostsManagerPage = () => {
  // Store에서 상태 가져오기
  const { posts, total, loading, error } = usePostStore()
  const { comments } = useCommentStore()
  const { selectedUser } = useUserStore()

  // 필터 및 페이지네이션
  const filters = usePostFilters()
  const pagination = usePostPagination(
    filters.skip,
    filters.limit,
    total,
    filters.setSkip,
    filters.setLimit,
    filters.syncURL
  )

  // Features hooks
  const { fetchPosts } = usePostList()
  const { searchPosts } = usePostSearch()
  const { getTags, getPostsByTag } = useTagFilter()
  const { createPost } = usePostCreate()
  const { updatePost } = usePostUpdate()
  const { deletePost } = usePostDelete()
  const { fetchComments } = useCommentList()
  const { createComment } = useCommentCreate()
  const { updateComment } = useCommentUpdate()
  const { deleteComment } = useCommentDelete()
  const { likeComment } = useCommentLike()
  const { fetchUser } = useUserDetail()

  // 모달 관리
  const postCreateModal = usePostCreateModal()
  const postEditModal = usePostEditModal()
  const postDetailModal = usePostDetailModal()
  const userModal = useUserModal()

  // 태그 목록
  const [tags, setTags] = useState<Array<{ url: string; slug: string }>>([])

  // 태그 가져오기
  useEffect(() => {
    getTags((tags) => {
      setTags(tags)
    })
  }, [getTags])

  // 게시물 가져오기 (skip, limit, selectedTag 변경 시)
  useEffect(() => {
    if (filters.selectedTag && filters.selectedTag !== "all") {
      getPostsByTag(filters.selectedTag)
    } else {
      fetchPosts(filters.limit, filters.skip)
    }
    filters.syncURL()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.skip, filters.limit, filters.selectedTag])

  // 검색 실행
  const handleSearch = async () => {
    if (!filters.searchQuery.trim()) {
      fetchPosts(filters.limit, filters.skip)
      return
    }
    await searchPosts(filters.searchQuery)
    filters.syncURL()
  }

  // 태그 변경
  const handleTagChange = async (tag: string) => {
    filters.setSelectedTag(tag)
    if (tag === "all") {
      await fetchPosts(filters.limit, filters.skip)
    } else {
      await getPostsByTag(tag)
    }
    filters.syncURL()
  }

  // 게시물 생성
  const handleCreatePost = async () => {
    try {
      await createPost(postCreateModal.formData, () => {
        postCreateModal.closeModal()
        fetchPosts(filters.limit, filters.skip)
      })
    } catch (error) {
      console.error("게시물 생성 오류:", error)
    }
  }

  // 게시물 수정
  const handleUpdatePost = async () => {
    if (!postEditModal.editingPost) return
    try {
      await updatePost(
        postEditModal.editingPost.id,
        postEditModal.formData,
        () => {
          postEditModal.closeModal()
          fetchPosts(filters.limit, filters.skip)
        }
      )
    } catch (error) {
      console.error("게시물 수정 오류:", error)
    }
  }

  // 게시물 삭제
  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId, () => {
        fetchPosts(filters.limit, filters.skip)
      })
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 게시물 상세 보기
  const handlePostDetail = (post: typeof posts[0]) => {
    postDetailModal.openModal(post)
    fetchComments(post.id)
  }

  // 게시물 수정 모달 열기
  const handleEditPost = (post: typeof posts[0]) => {
    postEditModal.openModal(post)
  }

  // 댓글 추가
  const handleAddComment = async (postId: number) => {
    try {
      await createComment({ body: "", postId, userId: 1 }, () => {
        fetchComments(postId)
      })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 수정
  const handleEditComment = async (comment: Comment) => {
    try {
      await updateComment(comment.id, { body: comment.body }, () => {
        fetchComments(comment.postId)
      })
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number, postId: number) => {
    try {
      await deleteComment(commentId, postId, () => {
        fetchComments(postId)
      })
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const handleLikeComment = async (commentId: number, postId: number) => {
    try {
      await likeComment(commentId, postId, () => {
        fetchComments(postId)
      })
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 사용자 모달 열기
  const handleUserClick = async (author: typeof posts[0]["author"]) => {
    if (!author) return
    try {
      await fetchUser(author.id)
      userModal.openModal()
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  // 정렬된 게시물 목록
  const sortedPosts = filters.sortPosts(posts)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={postCreateModal.openModal}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 게시물 목록 위젯 */}
          <PostList
            posts={sortedPosts}
            tags={tags}
            loading={loading}
            searchQuery={filters.searchQuery}
            selectedTag={filters.selectedTag}
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            skip={filters.skip}
            limit={filters.limit}
            total={total}
            onSearchChange={filters.setSearchQuery}
            onSearch={handleSearch}
            onTagChange={handleTagChange}
            onSortByChange={filters.setSortBy}
            onSortOrderChange={filters.setSortOrder}
            onLimitChange={pagination.handleLimitChange}
            onPrevPage={pagination.handlePrevPage}
            onNextPage={pagination.handleNextPage}
            onPostDetail={handlePostDetail}
            onPostEdit={handleEditPost}
            onPostDelete={handleDeletePost}
            onUserClick={handleUserClick}
            onTagClick={handleTagChange}
          />

          {/* 에러 표시 */}
          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-md">
              {error}
            </div>
          )}
        </div>
      </CardContent>

      {/* 게시물 생성 모달 */}
      <PostCreateModal
        isOpen={postCreateModal.isOpen}
        onClose={postCreateModal.closeModal}
        title={postCreateModal.formData.title}
        body={postCreateModal.formData.body}
        userId={postCreateModal.formData.userId}
        onTitleChange={postCreateModal.updateTitle}
        onBodyChange={postCreateModal.updateBody}
        onUserIdChange={postCreateModal.updateUserId}
        onSubmit={handleCreatePost}
      />

      {/* 게시물 수정 모달 */}
      <PostEditModal
        isOpen={postEditModal.isOpen}
        onClose={postEditModal.closeModal}
        post={postEditModal.editingPost}
        onTitleChange={postEditModal.updateTitle}
        onBodyChange={postEditModal.updateBody}
        onSubmit={handleUpdatePost}
      />

      {/* 게시물 상세 모달 */}
      <PostDetail
        post={postDetailModal.selectedPost}
        comments={postDetailModal.selectedPost ? comments[postDetailModal.selectedPost.id] || [] : []}
        searchQuery={filters.searchQuery}
        isOpen={postDetailModal.isOpen}
        onClose={postDetailModal.closeModal}
        onAddComment={() => postDetailModal.selectedPost && handleAddComment(postDetailModal.selectedPost.id)}
        onLikeComment={handleLikeComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />

      {/* 사용자 모달 */}
      <UserModal
        isOpen={userModal.isOpen}
        onClose={userModal.closeModal}
        user={selectedUser}
      />
    </Card>
  )
}

export default PostsManagerPage
