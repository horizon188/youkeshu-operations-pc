import ReactDom from "react-dom";
import React from "react";
// import store from "./src/store";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./app.less";

// const Hooks = withLoadable(() => import("./src/views/hooks"));
const Users = () => <h2>页面二</h2>;
ReactDom.render(
  <Router>
    <Switch>
      {/* <Route path="/" exact component={() => import("./src/component/App/AppView")} /> */}
      {/* <Route path="/Hooks" component={Hooks} /> */}
      <Route path="/users" component={Users} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
