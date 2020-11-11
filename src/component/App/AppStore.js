// lodash遍历对象的key键
import { get, keys, filter } from 'lodash'
// mobx的公共方法
import { observable, action, useStrict, runInAction, autorun,computed } from 'mobx';
// 请求路由配置项
import { getRouterTable, getUserAccess, getMenuList, queryDirTree } from './AppServ';
import Config from 'config/Config'
import Utils from 'utils';

// 严格模式
useStrict(true);

class AppStore {
  // 监视状态
  @observable state = {
    isLoaded: false,
    routerCfg: {},
    hookCbf: null,
    userAccess: {},
    menuList: [],
    buttonList: {},
    instanceList: [],
    dirTree:[]
  };

  // 构造函数
  constructor() { 

  };

// 获取商品类目
@action
queryDirTree = async () => {
  try {
    const { data, resultCode, resultMsg } = await queryDirTree();
    if (resultCode + '' === '0') {
      let newDir = [];
      
      data.map((item) => {
        let obj = {};
        obj.label = item.name;
        obj.value = item.id;
        newDir.push(obj)
      })
      newDir.unshift({
        label: '全部',
        value: null
      })
      runInAction(() => {
        this.state.dirTree = newDir
      })
    }
  } finally {

  }
}

  // 将菜单的数组，整理成树
  array2tree(list, options = { customID: 'id', parentProperty: 'parentId' }) {
    const res = [];
    const map = list.reduce((res, v) => (res[v.key] = v, res), {});

    for (let item of list) {
      if (item.parentId in map) {
        const parent = map[item.parentId];
        parent.children = parent.children || [];
        let sortIndex = -1;

        for (let i = 0, length = parent.children.length; i < length; i++) {
          if (parent.children[i].sortNo > item.sortNo) {
            break;
          }

          sortIndex = i;
        }

        parent.children.splice(sortIndex + 1, 0, item);
      } else {
        res.push(item);
      }
    }

    return res;
  }

  accessList(accessSet) {
    let menuList = [];
    if (!accessSet || !accessSet.length) {
      return {};
    }

    let buttonList = [];
    accessSet.map((item) => {
      if (item.menuDto) {
        let menuDto = item.menuDto;

        menuList.push({
          key: menuDto.id,
          name: menuDto.name,
          icon: menuDto.icon,
          url: menuDto.routePath,
          parentId: menuDto.parentId,
          sortNo: menuDto.sortNo
        });
      } else if (item.buttonDto) {
        let buttonDto = item.buttonDto;
        let obj = {}
        obj.auth = buttonDto.code
        buttonList.push(obj);
      }
    });

    let menuTree = [];
    this.array2tree(menuList).forEach((item) => {
      if (!!item.children) {
        menuTree = item.children;
      }
    });

    return {
      menuList: menuTree,
      buttonList
    }
  }

  // 设置路由配置
  @action
  getAccess = async (callback) => {

    try {
      // 请求路由表
      let fromNetwork = Config.fromNetwork;
      let isLoginView = /\/login/.test(Utils.getPathName());
      let interfaceArr = [];
      // 登录页时，不请求角色权限接口
      if (isLoginView) {
        interfaceArr = [];
      } else {
        interfaceArr = [fromNetwork ? getUserAccess() : getMenuList()];
      }

      const resArray = await Promise.all(interfaceArr);

      runInAction(() => {

        if (!isLoginView && fromNetwork) {
          let accessSet = get(resArray[0], 'data.userAccessVo.accessSet', []);
          let result = this.accessList(accessSet);

          console.log('1111111111111', result)
          this.state.menuList = result.menuList || [];
          window._authList  = result.buttonList || [];
          callback(result.menuList || [])
        } else {
          this.state.menuList = get(resArray[0], 'data.list', []);
          callback(get(resArray[0], 'data.list', []))
        }
      });
    } catch (error) {
      runInAction(() => {
        // this.state.isLoaded = true;
      })
    }

  }

  // 设置路由配置
  @action.bound setRouterCfg = async () => {
    // 请求路由表
    let res = await getRouterTable();
    // 设置到状态机 - 如果是异步，必须在runInAction
    runInAction(() => {
      this.state.isLoaded = true;
      console.log('res.data.list---', res.data.list)
      this.state.routerCfg = res.data.list;
    });
    // 监控数据变化的回调,读取什么参数，即代表将要监控什么数据
    autorun(() => {
      // console.info("router table is isLoaded: ", this.state.isLoaded);
    })
  }

  @action.bound hideLoading = async () => {
    runInAction(() => {
      this.state.isLoaded = true;
    });
  }

  // 设置关闭页签钩子配置
  @action.bound setCloseHook = (hookCbf) => {
    runInAction(() => {
      this.state.hookCbf = hookCbf;
    });
  }

  // 设置页签标题等内容
  @action.bound setTabsInfo = (titleObj) => {
    let k = keys(titleObj)[0];
    runInAction(() => {
      this.state.routerCfg[k] = titleObj[k];
    });
  }
  
  @action.bound
  setState(payload) {
    this.state = { ...this.state, ...payload };
  }
}

const appStore = new AppStore();
export default appStore;
export { AppStore };