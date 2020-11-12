import { createBundle } from "component/Common";
import AppView from "./../pages/home/AppView";
/* ----------------------------外部对账模块 - 佚名end----------------------------------------- */

//---ROUTER_IMPORT--- // 上面这个标记不能去掉

export default [
  {
    path: "/home",
    component: () => createBundle(AppView),
    name: "列表",
  },
];
