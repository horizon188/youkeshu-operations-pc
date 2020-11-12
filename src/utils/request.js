import qs from 'qs'
import axios from 'axios'
import Cookie from 'js-cookie'
import { message } from 'antd'
import { DB, replaceAll, queryToObj } from '@utils/index'
import { cloneDeep, get as lodashGet } from 'lodash'
import { get, batchGet } from './index'
import statiConfig from 'config/Config'
import { clearCookie } from '@utils/DB.js'

message.config({
  duration: 2,
  maxCount: 1,
});

// 传值登录
(() => {
  const { token = null, userId = null, userName = null } = queryToObj();

  if (token && userId && userName) {
    Cookie.set(statiConfig.cookie.auth, token, { expires: 1 })
    Cookie.set(statiConfig.cookie.user_id, userId, { expires: 1 })
    Cookie.set(statiConfig.cookie.user_name, userName, { expires: 1 })
  }
})()

axios.defaults.timeout = 180000

const withCredentials = true
// axios.defaults.withCredentials = true
//axios.defaults.baseURL = ''

/**
 * token过期或者未登录
 * */
const redirectToLogin = () => {
  setTimeout(() => {
    clearCookie()
    window.localStorage.clear()
    console.log('登出')
    window.app.globalEvent.emit('routerChange', '/login')
  }, 0)
}

/**
 * 获得凭证
 *
 * @returns string
 */
const getAuth = function () {
  const auth_name_cookies = Cookie.get(statiConfig.cookie.auth_name)
  const auth_name_local = window.localStorage.getItem('token')
  let result = auth_name_cookies || auth_name_local
  return [undefined, null, 'undefined', 'null'].includes(result) ? null : result
}

/**
 * 获得app key
 *
 * @returns
 */
const getAppKey = function () {
  const cookieAppKey = Cookie.get(statiConfig.cookie.appKey)
  const result = cookieAppKey || statiConfig.appKey
  return result
}

/**
 * 本地开发时，特殊需要待的请求头
 *
 * @returns
 */
const localHeaders = function () {
  return {
    // hostName: 'store-mgmt.dev.tianyoudairy.com'
  }
  let result = {}
  const dict = {
    dev: 'store-mgmt.dev.tianyoudairy.com',
    test: 'store-mgmt-test.dev.tianyoudairy.com',
  }
  if (window.location.href.includes('localhost')) {
    const env = Object.keys(dict).find(key => key === statiConfig.ENV)
    const hostName = dict[env]
    return {
      hostName
    }
  }
  return result
}

/**
 * 必须有值的请求头
 *
 */
const mustHasVal = function () {
  const vals = {
    auth: getAuth(),
  }
  let result = {}
  Object.entries(vals).forEach(entries => {
    const [key, value] = entries
    if (value != null) {
      result[key] = value
    }
  })
  return result
}

/**
 * 控制请求头
 *
 * @param {object} [baseHeaders={}]
 */
const headersControl = function (baseHeaders = {}, method = 'get') {
  const headers = cloneDeep(baseHeaders || {})
  // headers['Content-type'] = 'application/json'
  const formType = 'application/x-www-form-urlencoded'
  const ContenTypes = batchGet([headers, statiConfig], 'Content-type', null)
  const ApplicationKey = get(headers, 'Application-Key', getAppKey())
    //本地联调
  if (location.hostname.indexOf('localhost') > -1 || location.hostname.indexOf('127.0.0.1') > -1) {
    headers.hostName = statiConfig.hostName;
  }
  const result = {
    ...headers,
    Expires: -1,
    ...mustHasVal(),
    // ...localHeaders(),
    // hostName:'mall-mgmt.dev.tianyoudairy.com',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    // 'Application-Key': ApplicationKey,
    'Access-Token': Cookie.get(statiConfig.cookie.auth),
    'Content-type': ContenTypes.find(item => item) || formType,
     //'sellerId':  JSON.parse(window.localStorage.getItem(statiConfig.currentOrgKey))
  }
  return result
}

const credentials = function (config) {
  const vals = [config.withCredentials, withCredentials, false]
  return vals.find(val => val != null)
}


/**
 * 如果登录了，就把token写入header
 * */
// 请求拦截
axios.interceptors.request.use(
  config => {
    config.url = statiConfig.apiAppName(config.url)    
    // 设置响应类型为json
    config.responseType = 'json'
    const method = config.method.toLowerCase()
    if (['post', 'put'].every(m => method !== m)) {
      config.params = config.data
    }
    return {
      ...config,
      withCredentials: credentials(config),
      headers: headersControl(config.headers),
    }
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
axios.interceptors.response.use(
  async response => {
    console.log('response', response)
    let { data } = response;

    // 非路由初始化，才立即隐藏loading
    // if (!response.config.headers.router_init) {
    // AppStore.hideLoading()
    // }

    if ('' + data.resultCode == '4008' || '' + data.resultCode == '401' || '' + data.resultCode == '4005') {
      // 4005 token缺失不提示
      if('' + data.resultCode != '4005') {
        message.error(lodashGet(data, 'resultMsg', '登录失效'))
      }
      redirectToLogin()
      return data;
    }

    // 其他状态码报错
    if ('' + data.resultCode !== '0') {
      // alert(lodashGet(data, 'resultMsg', '接口服务故障'))
      console.log('响应拦截 message.error')
      message.error(lodashGet(data, 'resultMsg', '接口服务故障'))
    }

    return data
  },
  error => {
    // AppStore.hideLoading()
    const status = lodashGet(error, 'response.status', 500) + ''
    if (status === '400') {
      message.error(lodashGet(error, 'response.data.resultMsg', '参数错误'))
    } else if (lodashGet(error, 'response.status', null) != null) {
      message.error(lodashGet(error, 'response.data.resultMsg', '发版中...'))

      // message.error(get(error, [
      //   'response.data.resultMsg',
      //   'response.data.message'
      // ], '未知到错误'))
    }
    console.log( '请求出错啦', JSON.parse(JSON.stringify(error)))
    return lodashGet(error, 'response.data', {})
  }
)

export default axios
