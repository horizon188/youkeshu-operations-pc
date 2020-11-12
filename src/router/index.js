import React from "react";
import extraRouters from "./extraRouters";
import { createBundle } from "component/Common";
import { Route, Switch } from "react-router-dom";
// import CacheRoute, {
//   CacheSwitch,
//   getCachingKeys,
// } from "react-router-cache-route";

import NotFound from "component/NotFound/NotFoundView";
//---ROUTER_IMPORT---
// 上面这个标记不能去掉

const routerGenerator = function () {
  const result = [];
  result.push(...extraRouters);

  return result;
};

const getRouter = (_) => (
  <div>
    <Switch>
      {routerGenerator().map((route, idx) => {
        const baseParam = {
          key: "route_" + idx,
          path: route.path,
          exact: true,
        };
        <Route {...baseParam} component={route.component()} />;
      })}
      <Route component={createBundle(NotFound)} />
    </Switch>
  </div>
);

export { getRouter, routerGenerator };
