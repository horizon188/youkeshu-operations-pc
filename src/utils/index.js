import { parse } from 'qs'
import Moment from 'moment'
import localDB from './DB'
import { isArray, pick, map, mergeWith, get as lodashGet, isEqual, isObject, set, isFunction } from 'lodash'
import { func } from 'prop-types';
export const getQueryString = function (name) {
	let after = window.location.hash.split('?')[1] || ''
	if (!after || !name) {
		return null
	}

	if (isArray(name)) {
		// 去空格
		let obj = parse(after.trim())
		// 每一项都解码
		map(obj, v => {
			return decodeURIComponent(v)
		})
		return pick(obj, name)
	}

	let reg = new RegExp('(^|&)' + name.trim() + '=([^&]*)(&|$)')
	let r = after.trim().match(reg)
	if (r != null) {
		return decodeURIComponent(r[2])
	} else {
		return null
	}
}

/**
 * dateString  只支持  2019-05-28 15:11:19 时间格式 或者  1559027246000  时间戳格式
 *
 * @static
 * @param {*} dateString
 * @param {string} [format='YYYY-MM-DD HH:mm:ss']
 * @returns
 */
export const timeZone = function (dateString, format = 'YYYY-MM-DD HH:mm:ss') {
	let timeObj = {
		timeStamp: '', //时间戳
		utcTime: '', //utc时间
		utcTimeStamp: '', // utc时间戳
		timeZone: '', //当前时区
		currentZoneTime: '', //当前时区的时间
		time: '', //时间戳直接转为时间
	}
	if (!dateString) return timeObj

	if (dateString.indexOf('-') > -1 && dateString.length == 10) {
		dateString += ' 00'
	}

	//如果不开启时区效果， 则取消时区转换功能
	if (!Config.isTimeZone) {
		timeObj.utcTime = dateString
		timeObj.currentZoneTime = dateString
		return timeObj
	}

	if (String(dateString).length == 10) dateString = dateString * 1000
	//转为时间戳
	timeObj.timeStamp = Date.parse(dateString)
	timeObj.utcTime = Moment.utc(timeObj.timeStamp).format(format)
	timeObj.timeZone = new Date().getTimezoneOffset() / 60 //获取时区
	//当前时区时间等于 UTC时间加上时区偏差
	timeObj.currentZoneTime = Moment(dateString)
		.subtract(timeObj.timeZone, 'hour')
		.format(format)
	timeObj.time = Moment(dateString).format(format)
	return timeObj
}

/**
 *  千分位组件，传入金额，返回千分位数字
 * number {number} 需要格式化的数字 默认0
 * precision {number} 需要保留的小数位，默认0
 * prefix {string} 是否需要加金额前缀，默认false
 *
 * @param {*} { number = 0, precision = 0, prefix = false }
 * @returns
 */
export const numberFormat = function ({ number = 0, precision = 0, prefix = false }) {
	let isPlus = true
	if (String(number).indexOf('-') > -1) {
		isPlus = false
		number = Number(String(number).replace(/-/g, ''))
	}
	let displayPrefix = prefix ? prefix : ''
	number = String(number).replace(/(^\s*)|(\s*$)/g, '')
	if (isNaN(number) || !number) {
		return displayPrefix + parseFloat(0).toFixed(precision)
	} else {
		number = parseFloat(number).toFixed(precision)
	}
	number = number + ''
	if (number) {
		let nums = number.split('.')
		let num = nums[0].slice(nums[0].length % 3)
		let numBegin = nums[0].slice(0, nums[0].length % 3)
		number =
			numBegin +
			(numBegin && num ? ',' : '') +
			(num ? num.match(/\d{3}/g).join(',') : '') +
			(nums[1] ? '.' + nums[1] : '')
	}
	if (!isPlus) {
		number = '-' + number
	}
	return displayPrefix + number
}

export const queryToObj = function () {
	const url = window.location.href
	let result = {}
	const urlSplit = url.split('?')
	const len = urlSplit.length - 1
	let queryParam = urlSplit[len] || ''
	queryParam
		.split('&')
		.filter(str => str !== '')
		.forEach(str => {
			const [key, value] = str.split('=')
			result[key] = value
		})
	return result
}

export const queryParam = function (obj, delKey) {
	let result = []
	Object.entries(obj).forEach(entries => {
		const [key, value] = entries
		if (key !== delKey) {
			result.push(`${key}=${value}`)
		}
	})
	return result.join('&')
}

export const cutOffUrl = function (delKey) {
	const baseUrl = window.location.href
	const queryObj = queryToObj()
	const queryStr = queryParam(queryObj, delKey)
	const result = `${baseUrl}${queryStr === '' ? '' : '?' + queryStr}`
	return result
}

/**
 * lodash的 get函数超集，当取得值为null、 null、undefined,''将返回默认值
 * path支持数组，会依次选取优先级高的放前面
 * @static
 * @param {object} obj 源数据
 * @param {string|array} path 参数路径
 * @param {*} defaultValue 默认值
 * @returns
 *
 */
export const get = function (obj, path, defaultValue) {
	let value = null
	const rules = [null, 'null', '', undefined]
	const pathList = toArray(path)
	for (let p of pathList) {
		value = lodashGet(obj, p + '', null)
		if (!rules.includes(value)) {
			return value
		}
	}
	return defaultValue
}

/**
 * 批量获得多个对象的同一个数据路径值
 *
 * @param {*} path 数据路径
 * @param {*} objList 对象列表
 * @param {*} defaultValue 默认值
 * @returns
 */
export const batchGet = function (objList, path, defaultValue) {
	let result = toArray(objList).map(obj => get(obj, path, defaultValue))
	return result
}

/**
 * 在一个对象里面获得多个值
 *
 * @param {*} obj
 * @param {Array} pathList
 * @param {*} defaultValue
 * @returns Array
 */
export const getBatch = function (obj, pathList, defaultValue) {
	let result = []
	for (let path of toArray(pathList)) {
		const value = get(obj, path, defaultValue)
		result.push(value)
	}
	return result
}

/**
 * lodash 的 mergeRight 改造，将会选择为null，undefined的值
 *
 * @returns
 */
export const merge = function () {
	return mergeWith(...arguments, (obj, source) => {
		if ([obj, source].some(item => [null, undefined].includes(item))) {
			return obj || source
		}
	})
}

/**
 * 生成序列数组
 *
 * @static
 * @param {number} n
 * @returns
 *
 */
export const range = function (n) {
	return Array.from(new Array(n).keys())
}

/**
 * 删除对象的某个键
 *
 * @param {object} obj
 * @param {string} path 数据路径
 */
export const removeKey = function (obj, path) {
	const pathList = path.split('.')
	const length = pathList.length
	if (length > 1) {
		const valueKey = pathList[length - 1]
		const targetKey = pathList.slice(0, length - 1).join('.')
		const target = get(obj, targetKey, {})
		delete target[valueKey]
	} else {
		delete obj[path]
	}
}

/**
 * 批量删除对象的键
 *
 * @param {object} obj
 * @param {array} pathList
 * @returns object
 */
export const removeKeys = function (obj, pathList) {
	const list = toArray(pathList)
	list.forEach(path => {
		removeKey(obj, path)
	})
	return obj
}

/**
 * 数据模型映射函数
 *
 * @static
 * @param {object} source 数据源
 * @param {Array} dataModel 数据模型
 * @returns object
 *
 */
export const mapping = function (source, dataModel) {
	const result = {}
	Object.entries(dataModel).forEach(entries => {
		const [key, path] = entries
		if (typeof path === 'string') {
			result[key] = get(source, path, '')
		} else {
			result[key] = mapping(source, path)
		}
	})
	return result
}

/**
 * 包装工厂函数，数据映射超集，多一个处理函数
 *
 * @static
 * @param {object} source 数据源
 * @param {object} mod 数据模型
 * @param {Function} hander 处理函数
 * @param {Function} modMapping 自定义的模板映射函数
 * @returns
 *
 */
export const factory = function (source, mod, hander, modMapping) {
	let result = source
	if (hander) {
		result = hander(source)
	} else if (mod) {
		const fun = modMapping || mapping
		result = fun(source, mod)
	}
	return result
}

/**
 * 局部变更key
 *
 * @param {object} sourceObj
 * @param {array<object>} mapList
 * @returns
 */
export const localChangeKey = function (sourceObj, mapList) {
	const list = toArray(mapList)
	list.map(dict => {
		const { target, source } = dict
		const value = get(sourceObj, source, '')
		if (typeof target === 'string') {
			set(sourceObj, target, value)
		}
		removeKey(sourceObj, source)
	})
	return sourceObj
}

/**
 * 局部将对象的键映射转换
 *
 * @param {object} source 数据源
 * @param {object} mod 数据模型
 * @param {Function} hander 处理函数
 */
export const localFactory = function (source, mapList, hander) {
	return factory(source, mapList, hander, localChangeKey)
}

/**
 * 生成随机数
 *
 * @param {number} [n=32]
 * @returns
 */
export const random = function (n = 32) {
	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
	let letter = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
	let maxPos = chars.length
	let result = ''
	for (let i = 0; i < n; i++) {
		result += chars.charAt(Math.floor(Math.random() * maxPos))
	}
	result = letter.charAt(Math.floor(Math.random() * letter.length)) + result
	return result.substring(0, result.length - 1)
}

/**
 * 转换成数组
 *
 * @param {*} source
 * @returns
 */
export const toArray = function (source) {
	if (source instanceof Array) {
		return source
	} else {
		const result = source != null ? [source] : []
		return result
	}
}

/**
 * 字符串模板转换 ，将数据源对应{键}的值填入str
 *
 * @param {*} str 字符串
 * @param {*} source 数据源
 * @param {*} handle 处理函数
 * @returns
 */
export const strFormat = function (str, source, handle = () => { }) {
	if (str instanceof Function) {
		return str(source)
	} else if (!isObject(source)) {
		return str
	}
	const data = { ...source }
	const r = /{[^}]+}/
	while (r.test(str)) {
		const key = str
			.match(r)
			.toString()
			.replace('{', '')
			.replace('}', '')
		const value = get(data, key, [])
		const ids = toArray(value).filter(id => id != null)
		str = str.replace(r, ids.join(','))
		handle(key, value)
	}
	return str
}
/**
 * 过滤对象中的无效值
 *
 * @param {object} source
 * @param {Function} config.handle
 * @param {string} config.mode 过滤模式，深度-deep,浅层不传 deep
 * @returns
 */
export const filterEmpty = function (source, config = {}) {
	const result = {}
	const mergeConfig = merge({ mode: '', handle: () => { } }, config)
	const { mode, handle } = mergeConfig
	const filterIdent = [undefined, null, '', []]
	for (let key of Object.keys(source)) {
		const value = source[key]
		if (!filterIdent.some(ident => isEqual(ident, value))) {
			if (mode !== 'deep') {
				result[key] = value
			} else {
				if (value instanceof Array) {
					result[key] = value.map(item => filterEmpty(item, mergeConfig))
				} else if (isObject(value)) {
					result[key] = filterEmpty(value, mergeConfig)
				} else {
					result[key] = value
				}
			}
		} else if (handle(key, value) === true) {
			result[key] = value
		}
	}
	return result
}

/**
 * 数组转连接字符串，如果有一项是非值类型则返回原数组
 *
 * @param {array} array
 * @param {string} [joinMark=','] 连接符
 * @returns
 */
export const arrayJoin = function (array, joinMark = ',') {
	const result = []
	for (let item of array) {
		if (['string', 'number'].includes(typeof item)) {
			result.push(item)
		} else {
			return array
		}
	}
	return result.join(joinMark)
}
/**
 * 深度将对象的数组转成字符串
 *
 * @param {object} source
 * @param {string} [jointMark=',']
 */
export const deepArrayToStr = function (source, jointMark = ',') {
	const result = {}
	for (let key of Object.keys(source)) {
		const value = source[key]
		if (value instanceof Array) {
			result[key] = arrayJoin(value, jointMark)
		} else if (isObject(value)) {
			result[key] = deepArrayToStr(value, jointMark)
		} else {
			result[key] = value
		}
	}
	return result
}

/**
 * 将对象转换成查询参数附加到url后面
 *
 * @param {*} path
 * @param {*} param
 * @returns
 */
export const getPath = function (path, param) {
	let result = ''
	if (path.includes('?')) {
		let route = path + `&${queryParam(param)}`
		result = route.replace('??', '?').replace('&&', '&')
	} else {
		let route = path + `?${queryParam(param)}`
		result = route.replace('??', '?')
	}
	return result
}

//获取页面路径
export const getPathName = function (path, param) {
  let arr = window.location.hash.split('?');
  return arr[0].replace('#', '');
}

/**
 * 两个新老对象中，对checkList键的值进行批量比较，返回一个新对象，存储不相等的键-值的对象
 *
 * @param {array} checkList 键集合
 * @param {object} obj1 旧对象
 * @param {object} nextObj 新对象
 * @param {Function} handle 处理函数
 * @returns
 */
export const filterObj = function (obj, nextObj, checkList, handle) {
	let result = {}
	const checkArray = toArray(checkList)
	let keyList = checkArray.length === 0 ? Object.keys(obj) : checkArray
	const fun = isFunction(handle)
		? handle
		: (obj, nextObj, key) => {
			return nextObj[key]
		}
	for (let key of keyList) {
		if (!isEqual(obj[key], nextObj[key])) {
			const value = fun(obj, nextObj, key)
			if (value === false) {
				return result
			} else {
				result[key] = value
			}
		}
	}
	return result
}

/**
 * 判断一组值是否相等,有一组不等返回false
 *
 * @param {Array<Array>} [sources=[]] 二维数组
 */
export const isEqualBatch = function (sources = []) {
	for (let source of sources) {
		if (!isEqual(...source)) {
			return false
		}
	}
	return true
}

/**
 * 多个数组合并
 *
 * @param {*} arrays
 * @returns
 */
export const arrayConat = function (...arrays) {
	let result = []
	for (let arr of arrays) {
		result = result.concat(toArray(arr))
	}
	return result
}

/**
 *  dom 元素的 resize 监听对象
 *
 * @returns
 */
export const mutationObserver = function (element, attributeFilter, callback) {
	const keys = ['MutationObserver', 'WebKitMutationObserver', 'MozMutationObserver']
	const Observer = get(window, keys, null)
	const observer = new Observer(callback)
	console.log('监听开始')
	observer.observe(element, {
		attributes: true,
		childList: true,
		characterData: true,
		subtree: true,
		attributeFilter: toArray(attributeFilter).concat('style') || undefined,
	})
	return observer
}

/**
 * 向上寻找指定条件的父级
 *
 * @param {*} selector
 * @param {*} conditions
 * @returns
 */
export const findParentDom = function (selector, conditions) {
	const children = document.querySelector(selector)
	let keepDom = children
	const [key, value] = conditions.split('=')
	for (let i = 0; i < 30; i++) {
		const father = get(keepDom, 'parentElement', null)
		if (father == null) {
			break
		} else if (isEqual(father[key], value)) {
			return father
		} else {
			keepDom = get(keepDom, 'parentElement', null)
		}
	}
	return null
}

/**
 * 判断是否为ie浏览器
 *
 * @returns number| 'edge'
 */
export const ieVersion = function () {
	let version = -1
	let userAgent = navigator.userAgent //取得浏览器的userAgent字符串
	let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
	let isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
	let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
	if (isIE) {
		let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
		reIE.test(userAgent)
		let fIEVersion = parseFloat(RegExp['$1'])
		let ieVersionList = [7, 8, 9, 10]
		if (ieVersionList.includes(fIEVersion)) {
			version = fIEVersion + ''
		} else {
			version = '6'
		}
	} else if (isEdge) {
		return 'edge' //edge
	} else if (isIE11) {
		version = '11' //IE11
	} else {
		version = '-1' //不是ie浏览器
	}
	return version
}

/**
 * 计算数组的和
 *
 * @param {*} list
 * @returns
 */
export const sum = function (list) {
	const array = toArray(list)
	return array.reduce((total, n) => {
		if (typeof n === 'string') {
			return total + parseFloat(n)
		}
		return total + n
	}, 0)
}

/**
 * 计算属性值
 *
 * @param {*} ele
 * @param {*} key
 * @returns
 */
export const computedStyle = function (ele, key) {
	if (ieVersion() === '-1') {
		return window.getComputedStyle(ele).getPropertyValue(key)
	}
	return ele.currentStyle[key]
}

/**
 * 抵消属性导致的滚动条消失
 *
 * @param {HTMLElement} dom dom元素
 * @param {object} scroll
 * @returns object
 */
const offsetScroll = function (dom, scroll) {
	const overflow = computedStyle(dom, 'overflow')
	const overflowX = computedStyle(dom, 'overflow-x')
	const overflowY = computedStyle(dom, 'overflow-y')
	const dict = {
		'width-height': overflow,
		width: overflowX,
		height: overflowY,
	}
	Object.keys(dict).forEach(key => {
		const value = dict[key]
		const keys = key.split('-')
		if (value === 'hidden') {
			keys.forEach(k => (scroll[k] = 0))
		}
	})
	return scroll
}

/**
 * 计算元素产生的滚动条长度
 *
 * @param {*} selector
 */
export const scrollBar = function (selector) {
	const dom = document.querySelector(selector)
	const [clientWidth, clientHeight] = getBatch(dom, ['clientWidth', 'clientHeight'], 0)
	const scrollWidth = get(dom, 'scrollWidth', 0)
	const scrollHeight = get(dom, 'scrollHeight', 0)
	let dxWidth = scrollWidth - clientWidth
	let dxHeight = scrollHeight - clientHeight
	if (dom != null) {
		let result = { width: Math.max(0, dxWidth), height: Math.max(0, dxHeight) }
		result = offsetScroll(dom, result)
		return result
	}
	return { width: 0, height: 0 }
}

/**
 * 不会报错的json parse
 *
 * @param {*} obj
 * @returns
 */
export const jsonpParse = function (obj) {
	try {
		return JSON.parse(obj)
	} catch (error) {
		return obj
	}
}

/**
 * 替换所有目标目标字符串
 *
 * @param {*} str
 * @param {*} searchValue
 * @param {*} symbol
 * @returns
 */
export const replaceAll = function (str, searchValue, symbol) {
	let result = str
	while (result.includes(searchValue)) {
		result = result.replace(searchValue, symbol)
	}
	return result
}

/**
 * 递归取得选中的节点
 *
 * @param {*} treeList
 */
export const treeChecked = function (treeList) {
	let result = []
	for (let treeNode of toArray(treeList)) {
		const children = get(treeNode, 'children', null)
		const key = get(treeNode, 'key', '')
		const selected = get(treeNode, 'selected', false)
		if (children == null && selected === true) {
			result.push(key)
		} else {
			result = result.concat(treeChecked(children))
		}
	}
	return result
}

/**
 * 文本域回车切割为数组
 *
 * @param {*} [data={}]
 * @param {*} [fields=[]]
 * @returns
 */
export const textAreaBatch = function (data = {}, fields = []) {
	const thatData = typeof data === 'string' ? jsonpParse(data) : data
	let changeParam = {}
	for (let field of toArray(fields)) {
		let value = get(thatData, field, null)
		if (value == null) {
			continue
		} else {
			value = value
				.split('\n')
				.filter(row => !['', '\n'].includes(row))
				.join(',')
			changeParam[field] = value
		}
	}
	const result = { ...thatData, ...changeParam }
	return typeof data === 'string' ? JSON.stringify(result) : result
}

/**
 * 简单表单控件
 *
 * @param {*} id
 * @param {*} label
 * @param {*} [extra={}]
 * @param {*} [label="String"]
 */
export const simpleDyControl = function (id, label, type = 'String', required = false) {
	return {
		//作用在列上的参数
		colParam: { span: 8 },
		//表单控件
		controlList: [
			{
				//表单控件类型
				type,
				controlItemParam: {
					id,
					label,
					defaultValue: '',
					rules: { required },
				},
			},
		],
	}
}

/**
 * 第二级表单控件-可控制controlItemParam
 *
 * @param {string} id
 * @param {string} label
 * @param {Number} [span=8]
 * @param {Object} [extra={}]
 * @param {String} [label="String"]
 * @returns
 */
export const complexControl = function (id, label, type = 'String', span = 8, extra = {}) {
	return {
		//作用在列上的参数
		colParam: { span },
		//表单控件
		controlList: [
			{
				//表单控件类型
				type,
				controlItemParam: {
					id,
					label,
					...extra,
				},
			},
		],
	}
}

/**
 * 在树中找到匹配当前id的层级
 *
 * @param {*} tree
 * @param {*} id
 * @returns
 */
export const findNodeTree = function (tree, id) {
	for (let node of tree) {
		const key = get(node, 'key', '')
		const children = get(node, 'children', null)
		if (key === id) {
			return node
		} else if (children) {
			const target = findNodeTree(children, id)
			if (target != null) {
				return target
			}
		}
	}
	return null
}

/**
 * 判断是否是叶子节点
 *
 * @param {*} tree
 * @param {*} id
 */
export const treeLeaves = function (tree, id) {
	let obj = findNodeTree(tree, id)
	if (obj == null) {
		return false
	} else if (obj.children != null) {
		return false
	}
	return true
}

/**
 * 树过滤
 *
 * @param {*} tree
 * @param {*} statusFlag
 * @returns
 */
export const treeFilter = function (tree, statusFlag) {
	tree = tree.filter(item => {
		const status = get(item, statusFlag, true);
		const children = get(item, 'children', null);
		if (children) {
			item.children = treeFilter(children, statusFlag);
		}
		return status;
	})
	return tree
}

// 对象中某个属性值合计值
export const objSum = (data, field) => {
	const sumData = data.map(item => item[field] || 0);
  
	return sumData.reduce((total, num) => (total*1000 + num*1000)/1000, 0)
}

// 两个日期之间有多少天
export const getDaysBetween = (dateString1, dateString2) => {
  var startDate = Date.parse(dateString1);
  var endDate = Date.parse(dateString2);
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
  // alert(days);
  return days;
}

// 判断停订时间段有没有，在就返回true,不在返回false
/*
  curDataStr: String 当前日期
  beginDateStr: String 开始日期
  endDateStr: String 结束日期
*/
export const isDuringDate = (curDataStr, beginDateStr, endDateStr) => {
  var curDate = new Date(curDataStr),
    beginDate = new Date(beginDateStr),
    endDate = new Date(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
    return true;
  }
  return false;
}

// 返回两个时间点之间的所有日期，返回一个数组
/*
  stime: String 当前日期
  etime: String 开始日期
  endDateStr: String 结束日期
*/
export const getdiffdate = (stime, etime) => {
  //初始化日期列表，数组
  var diffdate = new Array();
  var i = 0;
  //开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    diffdate[i] = stime;

    //获取开始日期时间戳
    var stime_ts = new Date(stime).getTime();
    console.log('当前日期：' + stime + '当前时间戳：' + stime_ts);

    //增加一天时间戳后的日期
    var next_date = stime_ts + (24 * 60 * 60 * 1000);

    //拼接年月日，这里的月份会返回（0-11），所以要+1
    var next_dates_y = new Date(next_date).getFullYear() + '-';
    var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() + 1) + '-' : (new Date(next_date).getMonth() + 1) + '-';
    var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() : new Date(next_date).getDate();

    stime = next_dates_y + next_dates_m + next_dates_d;

    //增加数组key
    i++;
  }
  return diffdate
  // console.log(diffdate);
}

// 将json字符串转换成json对象
/*
  stringObj: 待转换的json字符串
*/
export const stringTojson = (stringObj) => {
  var jsonData = eval('(' + stringObj + ')');;
  return jsonData;
}

export const timeToStr = function (time) {
  const Y = time.getFullYear() + '-';
  const M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
  const D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()) + ' ';
  return Y + M + D;
}

/**
 * 计算n天后的日期
 *
 */
export const afternDay = function (startTime, n) {
	const dd = new Date(startTime);
  dd.setDate(dd.getDate() + n);
  return timeToStr(dd);
}

//根据毫秒数获取日期
export const msToDate = function(msec) {
	let datetime = new Date(msec);
	let year = datetime.getFullYear();
	let month = datetime.getMonth();
	let date = datetime.getDate();
	let hour = datetime.getHours();
	let minute = datetime.getMinutes();
	let second = datetime.getSeconds();
  
	let result1 = year +
				 '-' +
				 ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
				 '-' +
				 ((date + 1) < 10 ? '0' + date : date) +
				 ' ' +
				 ((hour + 1) < 10 ? '0' + hour : hour) +
				 ':' +
				 ((minute + 1) < 10 ? '0' + minute : minute) +
				 ':' +
				 ((second + 1) < 10 ? '0' + second : second);
  
	let result2 = year +
				 '-' +
				 ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
				 '-' +
				 ((date + 1) < 11 ? '0' + date : date);
  
	let result = {
		hasTime: result1,
		withoutTime: result2
	};
  
	return result;
 }

/* 获取时间段内属于星期一(*)的日期们
 * begin: 开始时间
 * end：结束时间
 * weekNum：星期几 {number}
 */
export const getWeek = function(begin, end, weekNum){
	var dateArr = new Array();
	var stimeArr = begin.split("-"); //=>["2020", "08", "30"]
	var etimeArr = end.split("-"); //=>["2020", "08", "31"]
 
	var stoday = new Date();
	stoday.setUTCFullYear(stimeArr[0], stimeArr[1]-1, stimeArr[2]);
	var etoday = new Date();
	etoday.setUTCFullYear(etimeArr[0], etimeArr[1]-1, etimeArr[2]);
 
	var unixDb = stoday.getTime() - 8*60*60*1000;//开始时间的毫秒数
	var unixDe = etoday.getTime() - 8*60*60*1000;//结束时间的毫秒数
 
	for (var k = unixDb; k <= unixDe;) {
	   let needJudgeDate = msToDate(parseInt(k)).withoutTime;
	   //不加这个if判断直接push的话就是已知时间段内的所有日期
	   if (new Date(needJudgeDate).getDay() === weekNum) {
		   dateArr.push(needJudgeDate);
	   }
		k = k + 24*60*60*1000;
	}
	return dateArr;
}

export const DB = localDB
export default {
	DB: localDB,
	get,
	sum,
	merge,
	range,
	random,
	factory,
	mapping,
	toArray,
  getPath,
  getPathName,
	timeZone,
	batchGet,
	cutOffUrl,
	ieVersion,
	scrollBar,
	strFormat,
	removeKey,
	arrayJoin,
	filterObj,
	queryToObj,
	removeKeys,
	treeLeaves,
	arrayConat,
	queryParam,
	replaceAll,
	jsonpParse,
	treeChecked,
	filterEmpty,
	numberFormat,
	localFactory,
	textAreaBatch,
	findParentDom,
	getQueryString,
	complexControl,
	deepArrayToStr,
	localChangeKey,
	simpleDyControl,
	mutationObserver,
  objSum,
  
  getDaysBetween,
  isDuringDate,
  getdiffdate,
  stringTojson,
  timeToStr,
  afternDay,
  msToDate,
  getWeek
}
