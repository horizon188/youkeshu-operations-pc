import { isEqual, isObject } from "lodash";
import React from "react";
import Loadable from "react-loadable";
/**
 * 若emptyList为空则过滤对象中的无效值
 * @param {object} source
 * @returns
 */
export const filterEmpty = function (source) {
  const result = {};
  for (let key of Object.keys(source)) {
    const value = source[key];
    const clearStatus = isEmpty(value);
    if (!clearStatus) {
      if (value instanceof Array) {
        result[key] = value.map((item) => filterEmpty(item));
      } else if (isObject(value)) {
        result[key] = filterEmpty(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
};
/**
 * 判断一个元素是否为空
 *
 * @param {*} source
 * @returns
 */
export const isEmpty = function (source) {
  const filterIdent = [undefined, null, "", [], "undefined", "null"];
  if (filterIdent.some((ident) => isEqual(ident, source))) {
    return true;
  }
  return false;
};

// 按需加载路由
export const withLoadable = (comp) => {
  return Loadable({
    loader: comp,
    loading: () => null,
    delay: 0,
  });
};
