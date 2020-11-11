import React, { Component } from "react";
// 路由对象
import { withRouter } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";
// 代码热更新插件
import { hot } from "react-hot-loader";
import { getRouter } from "router";

import SiderBar from "component/SiderBar/SiderBarView";
import FooterBar from "component/FooterBar/FooterBarView";
import HeaderBar from "component/HeaderBar/HeaderBarView";

import statiConfig from "config/Config";
import styles from "./LayoutLess.less";
import { get } from "@utils/index.js";
import Cookie from "js-cookie";
const { Header, Footer, Content } = Layout;
import PageTabs from "component/PageTabs/PageTabsView";
import { message } from "antd";

@withRouter
class LayoutView extends Component {
  constructor(props) {
    super(props);
    // 设置全局router对象，用于在Mod中的跳转
    window.app.router = this.props.history;

    this.state = { collapsed: false };
  }

  componentWillMount() {
    // 占时屏蔽登录验证
    // this.checkCookies()
    window.app.globalEvent.addListener("routerChange", (path) => {
      console.log("触发路由跳转");
      this.props.history.push(path);
    });
  }

  checkCookies = () => {
    const cookies = Cookie.get(statiConfig.cookie.auth);
    if (cookies == null || cookies === "") {
      message.error("请先登陆");
      setTimeout(() => {
        this.props.history.push("/login");
      }, 100);
    }
  };

  // 菜单折叠、展开切换
  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const collapsed = this.state.collapsed;
    return (
      <div className={styles.yx_layout}>
        <Layout>
          <SiderBar collapsed={collapsed} className="sider_bar" />
          <Layout>
            <HeaderBar collapsed={collapsed} toggle={(e) => this.toggle()} />
            <Content>
              <PageTabs />
              <div
                className="content_box"
                ref={(node) => {
                  if (node) {
                    node.style.setProperty(
                      "background",
                      "#f5f5f5",
                      "important"
                    );
                  }
                }}
              >
                <div className="content_layout">{getRouter()}</div>
              </div>
            </Content>
            <FooterBar />
          </Layout>
        </Layout>
      </div>
    );
  }
}

// 使用热更新插件，代码改动时更新视图
export default LayoutView;
