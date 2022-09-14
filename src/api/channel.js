// 关于频道的接口
import request from '@/utils/request'

/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 删除频道
 * @param {Number|String} id 频道的id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增频道（每调用一次接口只上传一个对象）
 * @param {Number|String}} id 频道的id
 * @param {*} seq 新增频道添加的索引值（要放到原有频道的哪个位置）
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
