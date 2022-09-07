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
