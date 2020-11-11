import { get } from '@utils/index'
const requestParamTemplate = {
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
    },
    levelConfig:function () {
        return{
            method: 'get',
            url: 'test-level'
        }
    }
}

export default requestParamTemplate