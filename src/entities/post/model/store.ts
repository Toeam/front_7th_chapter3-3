import { create } from 'zustand'
import type { Post } from './types'

interface PostStore {
  // 상태
  posts: Post[]
  total: number
  loading: boolean
  error: string | null
  selectedPost: Post | null

  // 순수한 상태 업데이트 함수들 (API 호출 없음)
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSelectedPost: (post: Post | null) => void
  
  // 상태 조작 함수들
  addPost: (post: Post) => void
  updatePostInStore: (id: number, post: Post) => void
  removePost: (id: number) => void
  clearError: () => void
  reset: () => void
}

const initialState = {
  posts: [],
  total: 0,
  loading: false,
  error: null,
  selectedPost: null,
}

export const usePostStore = create<PostStore>((set) => ({
  ...initialState,

  // 순수한 상태 업데이트
  setPosts: (posts: Post[]) => set({ posts }),
  setTotal: (total: number) => set({ total }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSelectedPost: (post: Post | null) => set({ selectedPost: post }),

  // 상태 조작
  addPost: (post: Post) => set((state) => ({
    posts: [post, ...state.posts],
    total: state.total + 1,
  })),

  updatePostInStore: (id: number, post: Post) => set((state) => ({
    posts: state.posts.map((p) => (p.id === id ? post : p)),
    selectedPost: state.selectedPost?.id === id ? post : state.selectedPost,
  })),

  removePost: (id: number) => set((state) => ({
    posts: state.posts.filter((p) => p.id !== id),
    total: state.total - 1,
    selectedPost: state.selectedPost?.id === id ? null : state.selectedPost,
  })),

  clearError: () => set({ error: null }),

  reset: () => set(initialState),
}))

