import React from "react";
import { connect } from "react-redux";
import "./QueryLess.less";
import { DatePicker } from "antd";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    this.props.dispatch({
      type: "INCREMENT",
    });
    //   this.props.history.push('/about/')
  }

  render() {
    const onChange = (date, dateString) => {
      console.log(date, dateString);
    };
    return <div className={"query"}></div>;
  }
}
export default connect((state) => ({
  number: state.number,
}))(App);
