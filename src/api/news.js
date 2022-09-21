// 所有有关于新闻的接口
import request from '@/utils/request.js'

/**
 * 获取文章
 * @param {String | Number} id 频道的id
 * @param {Number} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns Promise
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}

/**
 * 获取文章详情
 * @param {Number} id 文章的id
 * @returns
 */
export const getArticleItemAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

/**
 * 对文章点赞
 * @param {Number} target 文章ID
 * @returns
 */
export const likeArticleAPI = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消点赞
 * @param {Number} target 文章ID
 * @returns
 */
export const cancelLikeAPI = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 取消对文章不喜欢
 * @param {Number} target 文章ID
 * @returns
 */
export const cancelDislikeAPI = (target) => {
  return request({
    url: `/v1_0/article/dislikes/${target}`,
    method: 'DELETE'
  })
}

/**
 * 收藏文章
 * @param {Number} target 文章id
 * @returns
 */
export const collectArticleAPI = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 * @param {Number} target 文章的ID
 * @returns
 */
export const cancelCollectAPI = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
