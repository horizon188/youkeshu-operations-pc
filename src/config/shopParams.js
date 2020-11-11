import { get } from '@utils/index'
const requestParamDict = {
    setPrice: function (selectData) {
        return {
            method: 'get',
            url: '/prop/propValues',
            afterRequest(data){
                const newData = {...data}
                const schoolAgeGroup = get(data, selectData, [])
                const list = schoolAgeGroup.map(item=>({label:item.name,key:item.code}))
                newData.list = list
                return newData
            }
        }
    },
}

export default requestParamDict