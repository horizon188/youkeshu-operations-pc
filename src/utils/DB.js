// Cookie对象
import Cookie from 'js-cookie'
// 站点配置 test
import config from 'config/Config'

// 删除Cookie
const clearCookie = () => {
	if (!config.cookie) {
		return false
	}
	Object.keys(config.cookie).map((key, idx) => {
		Cookie.remove(config.cookie[key])
	})
	return true
}

/**
 * 读写缓存的工具类
 *
 * @class DB
 */
class DB {
	/**
	 * 从缓存提取值
	 *
	 * @static
	 * @param {string} key
	 * @returns
	 * @memberof DB
	 */
	static get(key) {
		let localValue = localStorage.getItem(key)
		return localValue ? JSON.parse(localValue) : null
	}

	/**
	 *
	 * 写入缓存
	 * @static
	 * @param {string} key 键
	 * @param {string} value 值
	 * @memberof DB
	 */
	static set(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}
}
export { clearCookie, DB }
