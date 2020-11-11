import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Footer } = Layout;

import styles from './FooterBarLess.less';
import { NavLink } from 'react-router-dom';

export default class FooterBarView extends Component {
  render(){

    return (
      <Footer className='footer'>
        重庆市天友乳业股份有限公司版权所有
      </Footer>
    )
  }
}
