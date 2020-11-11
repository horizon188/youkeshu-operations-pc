import { get } from '@utils/index'
const requestParamDict = {
	brand: function () {
		return {
			method: 'get',
			url: 'test-brand',
		}
	},
	producType: function () {
		return {
			method: 'get',
			url: 'test-producType',
		}
	},
	category: function () {
		return {
			method: 'get',
			url: 'test-category',
		}
	},
	queryConfig: function () {
		return {
			method: 'get',
			url: 'test-config'
		}
	}
}

export default requestParamDict
