import React from "react";
import { connect } from "react-redux";
import "./App.less";
import { DatePicker } from "antd";
import { Grid } from "component";
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
    return (
      <div className={"app"}>
        <Grid></Grid>
      </div>
    );
  }
}
export default connect((state) => ({
  number: state.number,
}))(App);
