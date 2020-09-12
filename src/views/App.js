import React from 'react';
import { connect } from 'react-redux';
import './App.less'
import {DatePicker} from 'antd'
class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch({
            type: 'INCREMENT',
          })
        //   this.props.history.push('/about/')
    }
    
      

    render() {
        const onChange =(date, dateString) => {
            console.log(date, dateString);
          }
        return (
            <div className={'app'}>
                <div>react-router 测试</div>
                <DatePicker onChange={onChange} />
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+11</button></div>

            </div>
        );
    }
}
export default connect( state => ({
    number: state.number
}))(App);