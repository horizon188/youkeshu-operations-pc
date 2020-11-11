import request from 'utils/request'
import requestParams from '@config/requestParams'
import { get, merge } from '@utils/index'
import config from 'config/Config' // 站点配置

export const delCacheUser = function() {
  return request({
    url: `users/logout`,
    method: 'POST',
  })
}

// 获取所有的平台的下拉列表
export async function getInstanceList() {
  return request({
    url: `/users//instance/list`,
    method: 'GET',
  })
}

// 跳转平台
export async function jumpApp(id) {
  return request({
    url: `/users/switch/application`,
    method: 'GET',
    data: {
      id: id
    }
  })
}