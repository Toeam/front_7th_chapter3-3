import { postApi, type Tag, type PostsResponse } from '../../../entities/post'

export const useTagFilter = () => {
  const getTags = async (onSuccess?: (tags: Tag[]) => void): Promise<Tag[]> => {
    try {
      const tags = await postApi.getTags()
      onSuccess?.(tags)
      return tags
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
      throw error
    }
  }

  const getPostsByTag = async (
    tag: string,
    onSuccess?: (result: PostsResponse) => void
  ): Promise<PostsResponse> => {
    if (!tag || tag === "all") {
      throw new Error('태그를 선택해주세요')
    }

    try {
      const result = await postApi.getPostsByTag(tag)
      onSuccess?.(result)
      return result
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
      throw error
    }
  }

  return { getTags, getPostsByTag }
}

