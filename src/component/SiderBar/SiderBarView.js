import Config from 'config/Config'
// import { YxAction } from 'yx-widget'
import AppStore from '../App/AppStore'
import { DB } from '@utils/DB'
import { get, isArray } from 'lodash'
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Menu, Input } from 'antd'
import { withRouter, NavLink } from 'react-router-dom'
import { toJS } from 'mobx';

const { Sider } = Layout
const { SubMenu } = Menu
const Search = Input.Search
const CDN_BASE = Config.CDN_BASE

import styles from './SiderBarLess.less'
//自定义滚动条（解决ie、firefox自带滚动条难看的问题）
// import { Scrollbars } from 'widget/ScrollBar/index'
// 异步请求
import request from 'utils/request'

// 存储整棵菜单树的数据
let storeMenuList = []
// 一级菜单的key值
let rootSubmenuKeys = []

// 递归渲染菜单项
const renderMenuItem = (menuArray, n = 0) => {
  let number = n + 1
  // 遍历菜单列表
  return menuArray.map((item, index) => {
    if (item.children) {
      return (
        <SubMenu key={item.code} className={`menu_item_${number}`} title={
          <span>
            {/* {item.icon ?
              (<i className={`iconfont ${item.icon} `} />)
              :
              null
            } */}
            {/* <Icon type="appstore" /> */}
            <span>{item.name}</span>
          </span>
        }>
          {renderMenuItem(item.children, number)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={item.code} className={`menu_no_item_${number}`}>
        <NavLink to={item.url ? item.url : '#'}>
          {/* {item.icon ?
            (<i className={`iconfont ${item.icon}`} />)
            :
            null
          } */}
          {/* <Icon type="appstore" /> */}
          <span>{item.name}</span>
        </NavLink>
      </Menu.Item>
    )
  })
}
@inject('AppStore')
// @withRouter // 在组件中可通过this.props.history.push跳转路由
@observer
class SiderBarView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [''],
      current: '',
      menuList: [],
      autoMentList: [],
      inlineCollapsed: false // 默认展开
    }
    this.AppStore = this.props.AppStore
  }

  componentDidMount() {
    // 请求菜单的接口
    this.AppStore.getAccess((menuList) => {
      this.getMenuList(menuList)
    })
  }

  setMenu = (menuList) => {
    this.setRootKeys()
    storeMenuList = menuList
  }

  recursiveMenu = (mockData, remoteList) => {
    // 占时屏蔽菜单权限
    return mockData

    const result = []
    for (let menu of mockData) {
      const code = menu.code
      const target = remoteList.find(item => item.code === code)
      const menuParam = {
        ...menu,
        name: get(target, 'menuName', menu.name),
      }
      if (target != null || Config.menuStatus) {
        if (menu.children) {
          menuParam.children = this.recursiveMenu(menu.children, remoteList)
        }
        result.push(menuParam)
      }
    }
    return result
  }

  mapRemoteList = (remoteList) => {
    const btnCodes = []
    const menuCodes = []
    for (let item of remoteList) {
      const menuName = get(item, 'menuName', '')
      const menuCode = get(item, 'menuCode', '')
      menuCodes.push({ name: menuName, code: menuCode })
      const btn = get(item, 'buttonList', null)
      if (btn instanceof Array) {
        btnCodes.push(btn)
      }
    }
    return { btnCodes, menuCodes }
  }

  filterMenuList = (mockRes, remoteList) => {
    const mock = get(mockRes, 'data.list', [])
    const mapMenuDict = this.mapRemoteList(remoteList)
    return this.recursiveMenu(mock, mapMenuDict.menuCodes)
  }

  // 查询菜单
  getMenuList = (menuList) => {

    this.setState({ menuList }, () => this.setMenu(menuList))
    return menuList
  }

  /**
   * 菜单点击处理
   * @param  {Object} e 事件源对象
   * @return {empty}   无
   */
  handleClick = e => {
    console.log('当前的激活的路由地址为', e.key, e)
    window._router = { code: e.key }
    this.setState({
      current: e.key,
    })
  }

  handleOpen = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  // 设置一级菜单目录的keys
  setRootKeys() {
    if (0 === this.state.menuList.length) {
      return false
    }
    this.state.menuList.map((m, i) => {
      rootSubmenuKeys.push(m.key)
    })
  }



  // 对菜单进行搜索筛选
  filterMenu = value => {
    let filterArr = storeMenuList.filter(item => {
      let str = JSON.stringify(item)
      return str.indexOf(value) >= 0
    })
    this.setState({
      menuList: filterArr,
    })
  }

  inlineCollapsed = () => {
    this.setState({ inlineCollapsed: !this.state.inlineCollapsed })
  }
  changeMenu = () => {
    console.log('当前路由', Config)
    if (Config.isDev()) {
      console.log('切换路由完整性')
      const status = get(DB.get('fullMenu'), 'status', false)
      DB.set('fullMenu', { status: !status })
      window.location.reload()
    }
  }

  render() {
    console.log('sider bar render')
    let { menuList } = this.state

    // const className = [this.props.className, 'yx_sider_bar', styles.yx_sider_bar]
    const className = [
      this.props.className,
      'yx_sider_bar',
      styles.yx_sider_bar,
      this.state.inlineCollapsed ? 'sider_inlineCollapsed power' : ''
    ]
    const openKeys = this.state.openKeys
    const current = this.state.current
    const menuArray = get(menuList, 'length', 0) !== 0 && renderMenuItem(menuList)
    // inlineIndent 菜单层级左侧空格大小，单位为px，空格量=左侧空格大小*层级level
    return (
      <Sider trigger={null} collapsible collapsed={this.state.inlineCollapsed} className={className.join(' ')}>

        <div className="logo" onClick={this.changeMenu} title={Config.isDev() ? '点击切换菜单完整性' : undefined} >
          <img src={`${CDN_BASE}/assets/imgs/login/ty-logo.png`} className="logo_img"></img>
          <div className="title_box">
            {
              get(Config, 'appName').split('-').map(item => (
                <p className="title">{item}</p>
              ))
            }
          </div>
        </div>
        <div className="menuWrap">
          <div className="folding">
            <div className="folding" onClick={this.inlineCollapsed}>
              {/* <YxAction styleType="icon" message={false}
                iconFont type={this.state.inlineCollapsed == true ? 'menu-unfold' : 'menu-fold'}
              onClick={this.inlineCollapsed} /> */}
            </div>
          </div>
          <div className="searchBlock">
            <Search placeholder="请输入关键字" onSearch={this.filterMenu} style={{ width: '100%' }} />
          </div>
          <div className="menuCont">
            {/*自定义滚动条组件*/}
            {/* <Scrollbars
              ref={e => {
                this.scrollbar = e
              }}
              renderTrackVertical={props => <div {...props} className="trackVertical" />}
              renderThumbVertical={props => <div {...props} className="thumbVertical" />}
            > */}
            {/* 左侧菜单列表 */}
            <Menu
              theme="dark"
              mode="inline"
              collapsed={true}
              inlineIndent={30}
              openKeys={openKeys}
              selectedKeys={[current]}
              defaultOpenKeys={openKeys}
              onClick={this.handleClick}
              onOpenChange={this.handleOpen}
              defaultSelectedKeys={[current]}
              inlineCollapsed={this.state.inlineCollapsed}
            >
              {menuArray}
            </Menu>
            {/* </Scrollbars> */}
          </div>
        </div>
      </Sider>
    )
  }
}

export default SiderBarView
