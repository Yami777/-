import request from '@/utils/request.js'
export const addCommentAPI = (commentArtId, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: commentArtId,
      content,
      art_id: artId
    }
  })
}
/**
 * 获取文章的评论或回复
 * @param {String} type 获取评论还是回复（a:评论，回复），必须
 * @param {String} source 评论的文章id，必须
 * @param {String|Numer} offset 从哪条评论开始获取
 * @param {String|Nume} limit 每页获取的评论数量
 * @returns
 */
export const getAllCommentsAPI = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
