import ReactDom from "react-dom";
import React from "react";
import store from "./src/store";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./app.less";

import { withLoadable } from "./src/utils";
const App = withLoadable(() => import("./src/component/App/AppView"));
// const Hooks = withLoadable(() => import("./src/views/hooks"));
const About = () => <h2>页面一</h2>;
const Users = () => <h2>页面二</h2>;
ReactDom.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        {/* <Route path="/Hooks" component={Hooks} /> */}
        <Route path="/users" component={Users} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
