import request from 'utils/request';
import config from 'config/Config';
import { has, get } from 'lodash';

/**
 * 获得路由配置
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getRouterTable(params) {
  return request({
    url: 'router/list',
    method: 'GET',
    data: params,
    app: 'ide-op-mgmt-application',
    headers: {
      router_init: true
    }
  })
}

// 获取用户角色权限
export async function getUserAccess(params) {
  return request({
    url: 'users/access',
    method: 'get',
    data: params,
  })
}

// 获取用户角色权限
export async function getMenuList() {
  return request({
    url: 'menu/list',
    method: 'get',
    data: {},
  })
}
// 获取商品分类
export async function queryDirTree() {
  return request({
    url: `/tyDir/queryByParam`,
    method: 'GET',
    data: {
      leaf: 1
    }
  })
}