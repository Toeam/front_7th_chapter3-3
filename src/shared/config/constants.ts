/**
 * 공통 상수 정의
 */

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_SKIP: 0,
  LIMIT_OPTIONS: [10, 20, 30] as const,
} as const

export const SORT = {
  DEFAULT_SORT_BY: 'none' as const,
  DEFAULT_SORT_ORDER: 'asc' as const,
} as const

