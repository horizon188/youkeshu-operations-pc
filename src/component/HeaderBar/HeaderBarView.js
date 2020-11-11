import { get } from 'lodash'
// 加载React
import React from 'react'
import { delCacheUser } from './HeaderBarServ'
// 加载Component
import { Component } from 'react'
// 路由对象
import { withRouter } from 'react-router-dom'
// Cookie对象
import Cookie from 'js-cookie'
import { YxInput } from "yx-widget";

// 引入antd的组件
import { Menu, Icon, Dropdown, Select, message, Row, Col, Form } from 'antd'
// 站点配置
import config from 'config/Config'
// 加载当前组件样式
import styles from './HeaderBarLess.less'
// import { YxAction } from 'yx-widget'
// 静态资源CDN前缀
const CDN_BASE = config.CDN_BASE || ''

// 引入组织机构组件
import OrgList from 'widget/OrgList/OrgListView'
// 引入我的消息组件
import MsgList from 'widget/MsgList/MsgListView'
// 引入修改密码对话框
import UpdatePwd from 'widget/UpdatePwd/UpdatePwdView'
// 样式管理
import cx from 'classnames'
// Cookie localStorage等的存储管理
import { clearCookie } from 'utils/store'
import { DB } from '@utils/DB.js'
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import mod from './HeaderBarStore'

@withRouter
@observer
class HeaderBarView extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = mod;
    this.state = {
      updatePwdFlag: false,
    }
  }

  componentDidMount() { 
    this.stores.getInstanceList()
  }

  // 比较对话框状态，已确保是否需要重新渲染
  getPwdDlgFlag(nextState) {
    return this.state.updatePwdFlag === nextState.updatePwdFlag
  }

	/**
	 * 登出
	 *
	 */
  doLogout = async () => {
    let { resultCode, resultMsg } = await delCacheUser()
    if (resultCode + '' !== '0') {
      messageInform(resultMsg || '注销失败', 'error')
      return false
    } else {
      clearCookie()
      message.success('注销成功')
      this.props.history.push('/login')
    }
  }

  showPwdDlg() {
    this.setState({ updatePwdFlag: true, })
  }

  hidePwdDlg(e, name) {
    if (name === 'onOk') {
      clearCookie()
      hashHistory.push('/login')
    }
    this.setState({
      updatePwdFlag: false,
    })
  }

  changeEnv = (key) => {
    return () => {
      if (window.ENV === key) {
        return
      } else {
        window.ENV = key
        DB.set('runContext', { status: key })
        clearCookie()
        this.props.history.push('/login')
        window.location.reload()
      }
    }
  }

	/**
	 * 下拉菜单点击事件
	 *
	 * @param {*} e
	 */
  handleClickMenu = e => {
    const dict = {
      logout: this.doLogout,
      // forgetPassword: this.showPwdDlg,
      forgetPassword: this.props.history.push('/PassWord/passWord'),
      dev: this.changeEnv('dev'),
      loc: this.changeEnv('loc'),
      pre: this.changeEnv('pre'),
      uat: this.changeEnv('uat'),
      test: this.changeEnv('test'),
      prod: this.changeEnv('prod'),
      opt: this.changeEnv('opt'),
    }
    const key = e.key + ''
    const handle = get(dict, key, () => console.log('unknown key', key))
    handle()
  }

  contextWwitching = () => {
    const href = window.location.href
    if (href.includes('localhost')) {
      const envList = [
        'loc-切换为本地环境',
        'dev-切换为开发环境',
        'test-切换为测试环境',
        'pre-切换为预生产环境',
        'uat-切换为UAT环境',
        'opt-切换为压测环境',
        'prod-切换为生产环境'
      ]
      return envList.map(env => {
        const [key, value] = env.split('-')
        return <Menu.Item key={key}>
          <a style={{ fontSize: '12px' }}>{value}</a>
        </Menu.Item>
      })
    }
    return []
  }

  getDropDownMenu() {
    return (
      <Menu onClick={e => this.handleClickMenu(e)}>
        <Menu.Item key="forgetPassword">
          <a style={{ fontSize: '12px' }}>修改密码</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a style={{ fontSize: '12px' }}>注销</a>
        </Menu.Item>
        {/* {this.contextWwitching()} */}
      </Menu>
    )
  }

  // 渲染用户信息
  renderUserInfo() {
    return (
      <div className='user'>
        <img src={`${CDN_BASE}/assets/imgs/avatar.jpg`} />
        <Dropdown
          overlay={this.getDropDownMenu()}
          trigger={['hover']}
          getPopupContainer={() => document.getElementById('routerApp_headRight')}
        >
          <a className="ant-dropdown-link" href="#" style={{ display: 'inline-block' }}>
            <span className='mg1'>{Cookie.get(config.cookie.user_name) || ''}</span>
            <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    )
  }

  // 渲染内容
  render() {
    const collapsed = this.props.collapsed
    console.log('toJS(this.stores.state.instanceList)', toJS(this.stores.state.instanceList))
    return (
      <div className={styles.tophead}>
        {/* 弹出的修改密码对话框 - 默认隐藏 */}
        {this.state.updatePwdFlag && (
          <UpdatePwd
            titleName="修改密码"
            visible={this.state.updatePwdFlag}
            onClose={e => {
              this.hidePwdDlg(e)
            }}
            onOk={e => {
              this.hidePwdDlg(e, 'onOk')
            }}
          />
        )}
        <div>
          <div className='headRight' id="routerApp_headRight">
            <div className='table'>
              <div className={'instan'}>
                <YxInput.YxSelect
                  form={this.props.form}
                  id={'instanceId'}
                  inputParam={{ style: { width: '224px' } }}
                  rules={{ required: true }}
                  label={""}
                  data={toJS(this.stores.state.instanceList)}
                  placeholder={"请选择跳转的平台"}
                  change={(value, rec, res, record) => this.stores.jumpApp(value, rec, res, record)}
                />
              </div>
              
              <div className='cell'>
                {this.renderUserInfo()}
              </div>
              {/* <div className='cell cell_org'>
                <OrgList />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(HeaderBarView);