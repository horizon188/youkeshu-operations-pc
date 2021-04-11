import ReactDom from "react-dom";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./app.less";

import { withLoadable } from "./src/utils";
// const App = withLoadable(() => import("./src/component/App/AppView"));
// const Hooks = withLoadable(() => import("./src/views/hooks"));
const About = () => <h2>页面一</h2>;
const Users = () => <h2>页面二11333,会突然想改</h2>;
ReactDom.render(
  <Router>
    <Switch>
      {/* <Route path="/" exact component={App} /> */}
      {/* <Route path="/Hooks" component={Hooks} /> */}
      <Route path="/users" component={Users} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
