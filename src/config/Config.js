import { get, jsonpParse, replaceAll, toArray } from '@utils/index'

const menuStatus = function () {
  const result = localStorage.getItem('fullMenu')
  const contextObj = jsonpParse(result)
  return get(contextObj, 'status', false)
}

const getEnv = function () {
  const dict = {
    loc: 'localhost',
    prod: 'operations.winshare.com.cn',
    uat: 'operations-uat.winshare.com.cn',
    opt: 'operations-opt.winshare.com.cn',
    dev: 'mall-mgmt.dev.tianyoudairy.com',
    test: 'mall-mgmt-test.dev.tianyoudairy.com',
    hot: 'mall-web.hot.tianyoudairy.com'
  }
  const href = window.location.href
  for (let env of Object.keys(dict)) {
    const domain = toArray(dict[env])
    if (domain.some(d => href.includes(d))) {
      return env
    }
  }
  return ENV || 'dev'
}

const setRunContext = function () {
  const context = localStorage.getItem('runContext')
  const contextObj = jsonpParse(context)
  const status = get(contextObj, 'status', getEnv())
  window.ENV = status
  console.log('当前环境为', window.ENV)
}

setRunContext()

const uploadFileUrl = function () {
  if (window.ENV === 'prod') {
    return '未知'
  }
  return 'http://10.100.9.201:8009'
}

const appName = function () {
  const baseName = '企业运营平台'
  if (window.ENV === 'prod') {
    return baseName
  }
  const dict = {
    loc: '本地环境',
    dev: '开发环境',
    test: '测试环境',
    pre: '预生产环境',
    uat: 'uat环境',
    hot: 'hot环境',
    opt: '压测环境',
  }
  const env = Object.keys(dict).find(key => window.ENV === key)
  return `${baseName} - ${dict[env]}`
}

let baseConfig = {
  menuStatus: menuStatus(),
  appName: appName(),
  //是否开启多时区功能，不开启的话， 多时区功能将会失效
  isTimeZone: false,
  //多语言配置，参数 zhCN、enUS，默认zhCN
  languageEnv: LANGUAGES_ENV,
  //是否需要登录验证，不开启将不需要登录，或者随意输入登录信息也可以登录
  isLogin: true,
  isB2BLogin: false,
  //是否开启组织机构机制
  isMultiOrg: true,
  //组织机构是直接显示value，还是显示欢迎语
  sysType: 'entCenter',
  //是否显示消息
  isMsgNotify: true,
  // homePath: '/',
  // 统一配置Cookie，所有的Cookie的键名均放在这个节点下
  cookie: {
    appKey: '',
    user_id: 'user_id',
    auth: 'action_token',
    user_name: 'user_name_mgmt_operation',
    auth_name: 'sso.login.account.operation.auth',
  },
  // uploadConfig: {
  //   uploadType: 's3',
  //   getFileUrl: '/oss/url/',
  //   policyUrl: '/oss/getPoliy',
  //   uploadFileUrl: uploadFileUrl(),
  // },
  // 上传签名Url
  policyUrl: POLICY_URL,

  //表单默认宽度分配参数
  formItemLayout: {
    labelCol: {
      sm: { span: 8 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },

  },
  // 环境变量
  ENV: window.ENV,
  // 静态资源CDN前缀
  CDN_BASE: CDN_BASE,
  // 后端接口基础地址
  BACKEND_BASE: BACKEND_BASE,
  // 前端静态资源发布路径
  publicPath: publicPath,
  'Content-type': 'application/json', // 默认的request请求 application/x-www-form-urlencoded
  // 上传组件的默认显示图片
  uploadImgdefault: CDN_BASE + '/assets/imgs/upload_default.png',
  mapKey: MAP_KEY,
  defaultLat:'29.35',
  defaultLng:'106.33',
}


// 根据不同环境变量，不同的配置
let envConfig = {
  loc: {
    
    mock: false,
    fromNetwork: false,    // true:请求后台获取菜单，false:读取本地菜单
    "CDN_BASE": "",
    "publicPath": "",
    // 开发环境
    hostName:'mall-web.dev.tianyoudairy.com',
    "BACKEND_BASE": "http://api.dev.tianyoudairy.com/api/mall/",
    icdp_hostName: "http://api.dev.tianyoudairy.com/api/icdp/v1/",
    imk_hostName: "http://api.dev.tianyoudairy.com/api/imarketing/v1/",
    "policyUrl": "http://api.dev.tianyoudairy.com/api/mall/v1/huieryun/objectstorage/policy/cube/getpolicy",
    // 测试环境
    // "BACKEND_BASE": "http://api.test.tianyoudairy.com/api/mall/",
    // icdp_hostName: "http://api.test.tianyoudairy.com/api/icdp/v1/",
    // imk_hostName: "http://api.test.tianyoudairy.com/api/imarketing/v1/",
    // hostName: 'mall-web-test.dev.tianyoudairy.com/',
    // "policyUrl": "http://api.test.tianyoudairy.com/api/mall/v1/huieryun/objectstorage/policy/cube/getpolicy",
  },
  dev: {
    mock: false,
    fromNetwork: true,
    "CDN_BASE": "./",
    "BACKEND_BASE": "http://api.dev.tianyoudairy.com/api/mall/",
    icdp_hostName: "http://api.dev.tianyoudairy.com/api/icdp/v1/",
    imk_hostName: "http://api.dev.tianyoudairy.com/api/imarketing/v1/",
    "publicPath": "",
    "policyUrl": "http://api.dev.tianyoudairy.com/api/mall/v1/huieryun/objectstorage/policy/cube/getpolicy",
  },
  test: {
    mock: false,
    fromNetwork: true,
    "CDN_BASE": "./",
    "BACKEND_BASE": "http://api.test.tianyoudairy.com/api/mall/",
    icdp_hostName: "http://api.test.tianyoudairy.com/api/icdp/v1/",
    imk_hostName: "http://api.test.tianyoudairy.com/api/imarketing/v1/",
    hostName: 'mall-web-test.dev.tianyoudairy.com/',
    "publicPath": "",
    "policyUrl": "http://api.test.tianyoudairy.com/api/mall/v1/huieryun/objectstorage/policy/cube/getpolicy",
  },
  uat: {
    mock: false,
    fromNetwork: true,
    "CDN_BASE": "./",
    "BACKEND_BASE": "https://api.uat.tianyoudairy.com/api/mall/",

    // icdp_hostName: "http://api.uat.tianyoudairy.com/api/icdp/v1/",
    // imk_hostName: "http://api.uat.tianyoudairy.com/api/imarketing/v1/",

    icdp_hostName: "https://api.uat.tianyoudairy.com/api/icdp/v1/",
    imk_hostName: "https://api.uat.tianyoudairy.com/api/imarketing/v1/",

    hostName: 'mall-web.uat.tianyoudairy.com',
    "publicPath": "",
    "policyUrl": "https://api.uat.tianyoudairy.com/api/mall/v1/huieryun/objectstorage/policy/cube/getpolicy",
  },
  hot: {
    mock: false,
    fromNetwork: true,
    "CDN_BASE": "./",
    "BACKEND_BASE": "https://api.hot.tianyoudairy.com/api/mall/",

    // icdp_hostName: "http://api.uat.tianyoudairy.com/api/icdp/v1/",
    // imk_hostName: "http://api.uat.tianyoudairy.com/api/imarketing/v1/",

    icdp_hostName: "https://api.hot.tianyoudairy.com/api/icdp/v1/",
    imk_hostName: "https://api.hot.tianyoudairy.com/api/imarketing/v1/",

    hostName: 'mall-web.hot.tianyoudairy.com',
    "publicPath": "",
    "policyUrl": "https://api.hot.tianyoudairy.com/api/mall/v1/huieryun/objectstorage/policy/cube/getpolicy",
  },
  prod: {
    mock: false,
    fromNetwork: true,
    "CDN_BASE": "./",
    "BACKEND_BASE": "https://api.tianyoudairy.com/api/mall/",

    // icdp_hostName: "http://api.tianyoudairy.com/api/icdp/v1/",
    // imk_hostName: "http://api.tianyoudairy.com/api/imarketing/v1/",
    icdp_hostName: "https://api.tianyoudairy.com/api/icdp/v1/",
    imk_hostName: "https://api.tianyoudairy.com/api/imarketing/v1/",
    hostName: 'mall-mgmt.tianyoudairy.com/',
    "publicPath": "",
    "policyUrl": "https://api.tianyoudairy.com/api/mall/v1/huieryun/objectstorage/policy/cube/getpolicy",
  },
}

// 合并配置
let config = Object.assign(baseConfig, envConfig[baseConfig.ENV])

console.log(config.BACKEND_BASE)
console.log('+++++++=====')

// 当设置mock为false时，有可能菜单和路由信息接口从本地获取
const localMenuAndRoute = (url) => {
  console.log(111)
  let arr = ['menu/list', 'router/list']
  return arr.includes(url) || url.includes('test-')
}

/**
 * 获得api接口地址
 * @param  {String} url    接口地址
 * @param  {Object} config 基础配置信息
 * @return {String}        转换过的接口地址
 */
const getApiAppName = function (url) {
  if (!url) {
    return
  } else if (['http', 'https'].some(agreement => url.includes(agreement))) {
    return url
  }

  // 本机开发环境，则当前assets/mock下面的json
  if (config.mock || localMenuAndRoute(url)) {
    const address = config.publicPath + "/assets/mock/" + url.replace(/\//g, "-") + '.json'
    return address
    // 其它环境，则读取真实应用的接口
  } else {
    let version = 'v1/'
    let host = config.BACKEND_BASE
    let path = replaceAll(`${version}/${url}`, '//', '/')
    let res = `${host}${path}`
    return res
  }
}

// 拼接接口所需域名和服务名，只需要输入接口名即可  如 yundt/mgmt/item/list-by-page，也不要加斜杆开始，
// 如果接口以http开头，则不会进拼接，而是保留原样
// 如果是mock，则会去assets/mock请求同名json，但/会被替换为-   如  yundt-mgmt-item-list-by-page.js
config.apiAppName = getApiAppName
config.isDev = function () {
  return ['dev', 'loc'].includes(ENV)
}
export default config
