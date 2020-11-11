// lodash遍历对象的key键
import { get, keys, filter } from 'lodash'
// mobx的公共方法
import { observable, action, useStrict, runInAction, autorun,computed } from 'mobx';
// 请求路由配置项
import {  getInstanceList, jumpApp } from './HeaderBarServ';
import Config from 'config/Config'
import Utils from 'utils';

// 严格模式
useStrict(true);

class HeaderBarStore {
  // 监视状态
  @observable state = {
    isLoaded: false,
    routerCfg: {},
    hookCbf: null,
    userAccess: {},
    menuList: [],
    buttonList: {},
    instanceList: [],
  };

  // 构造函数
  constructor() { 

  };


  // 获取所有的平台的下拉列表
  @action
  getInstanceList = async () => {
    try {
      const { data, resultCode, resultMsg } = await getInstanceList();
      if (resultCode + '' === '0') {
        let arr = []
        data.map((item) => {
          let obj = {}
          obj.label = item.appInsName
          obj.value = item.id
          obj.hostName = item.hostName
          arr.push(obj)
        })
        console.log('instanceList', arr)
        runInAction(() => {
          this.state.instanceList = arr
        })
      }
    } finally {

    }
  }

  // 获取所有的平台的下拉列表
  @action
  jumpApp = async (id, rec, res, record) => {
    let hostName = record.props.hostName
    console.log('hostName', hostName, hostName.indexOf('iservice'))
    try {
      const { data, resultCode, resultMsg } = await jumpApp(id);
      if (resultCode + '' === '0') {
        let { token, userId, userName } = data
        if (''+hostName.indexOf('iservice') !== '-1') {
          hostName = hostName + '/ty-iservice-operation-web-pc'
          window.open(`http://${hostName}/#/isrv/index/index?token=${token}&userId=${userId}&userName=${userName}`)
        } else {
          window.open(`http://${hostName}/#/?token=${token}&userId=${userId}&userName=${userName}`)
        }
      }
    } finally {

    }
  }

}

const headerBarStore = new HeaderBarStore();
export default headerBarStore;