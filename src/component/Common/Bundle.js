import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

@withRouter
class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  };

  //在此处判断路由权限
  componentWillMount(e) {
    //let location = this.props.location.pathname;
    ////拥有权限的路由列表，在正式环境中应该是从数据库中获取
    //let jurisdictionList = ['/timeZone','/hello'];
    ////通过location来判断当前路由是否拥有权限
    //jurisdictionList.push('/404'); //默认拥有404页面权限
    //if(!jurisdictionList.includes(location)){
    //  //如果没有权限，跳转到404页面
    //  this.props.history.push('/404');
    //}

    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.props.children(this.state.mod)
  }
}

export default Bundle;