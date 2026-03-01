import boardPostsData from '@/data/boardPosts.json'

/**
 * 게시글 목록 검색/정렬/페이지네이션
 *
 * @param {Object} options
 * @param {string} [options.searchType='title'] - 검색 타입: 'title' | 'content' | 'all'
 * @param {string} [options.keyword='']         - 검색어
 * @param {number} [options.page=1]             - 페이지 번호 (1부터 시작)
 * @param {number} [options.pageSize=10]        - 페이지 크기
 * @param {string} [options.sortKey='id']       - 정렬 기준 컬럼 키
 * @param {string} [options.sortOrder='desc']   - 정렬 방향: 'asc' | 'desc'
 *
 * @returns {{
 *   items: Array,
 *   totalCount: number,
 *   page: number,
 *   pageSize: number,
 *   totalPages: number
 * }}
 */
export function fetchPosts ({
  searchType = 'title',
  keyword = '',
  page = 1,
  pageSize = 10,
  sortKey = 'id',
  sortOrder = 'desc',
} = {}) {
  // 1단계: 필터링
  let filtered = [...boardPostsData]
  const kw = keyword.trim().toLowerCase()
  if (kw) {
    filtered = filtered.filter(post => {
      if (searchType === 'title') return post.title.toLowerCase().includes(kw)
      if (searchType === 'content') return post.content.toLowerCase().includes(kw)
      return post.title.toLowerCase().includes(kw) || post.content.toLowerCase().includes(kw)
    })
  }

  // 2단계: 정렬
  filtered.sort((a, b) => {
    const aVal = a[sortKey] ?? ''
    const bVal = b[sortKey] ?? ''
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sortOrder === 'asc' ? cmp : -cmp
  })

  // 3단계: 페이지네이션 (pageSize === -1 이면 전체 반환)
  const totalCount = filtered.length
  if (pageSize === -1) {
    return { items: filtered.map(omitContent), totalCount, page: 1, pageSize: -1, totalPages: 1 }
  }
  const totalPages = Math.ceil(totalCount / pageSize) || 1
  const safePage = Math.max(1, Math.min(page, totalPages))
  const start = (safePage - 1) * pageSize
  const items = filtered.slice(start, start + pageSize).map(omitContent)

  return {
    items,
    totalCount,
    page: safePage,
    pageSize,
    totalPages,
  }
}

// content 필드를 제외한 객체 반환 (목록 조회 시 불필요한 데이터 제외)
function omitContent ({ content: _, ...rest }) {
  return rest
}

/**
 * ID로 단일 게시글 조회
 *
 * @param {number} id
 * @returns {Object|null}
 */
export function findPostById (id) {
  return boardPostsData.find(post => post.id === id) ?? null
}
