import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
class App extends React.Component {

    constructor(props) {
        super(props);
        console.log('this.props',this.props)
    }

    onClick() {
        this.props.dispatch({
            type: 'INCREMENT',
          })
        //   this.props.history.push('/about/')
    }

    render() {
        return (
            <div>
                <div>react-router 测试</div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+11</button></div>

            </div>
        );
    }
}
export default connect( state => ({
    number: state.number
}))(App);