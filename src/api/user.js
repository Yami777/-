// user.js划分是根据后端接口文档划分的
import request from '@/utils/request'

/**
 *
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {String} mobile
 * @returns Promise
 */
export const senCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

/**
 * 上传图片
 * @param {*} file 裁剪过后的图片的file对象
 * @returns
 */
// 当传的是表单数据的时候自动添加请求头
export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserMsgAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 编辑用户资料
 * @returns Promise
 */
export const editUserMsgAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
/**
 * 关注用户
 * @param {String} id 作者的id
 * @returns
 */
export const focusUserAPI = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消关注
 * @param {String} autId 作者id
 * @returns
 */
export const cancelFocusAPI = (autId) => {
  return request({
    url: `/v1_0/user/followings/${autId}`,
    method: 'DELETE'
  })
}
