import React, { Fragment } from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Counter, TextInputWithFocusButton, FancyInput } from "./com";
const nameList = ["apple", "peer", "banana", "lemon"];
const Example = (props) => {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("apple");

  function getProductName() {
    console.log("getProductName触发");
    return name;
  }
  // 只对name响应
  useEffect(() => {
    console.log("name effect 触发");
    getProductName();
  }, [name]);

  // 只对price响应
  useEffect(() => {
    console.log("price effect 触发");
  }, [price]);

  // memo化的getProductName函数   🧬🧬🧬
  const memo_getProductName = useMemo(() => {
    console.log("name memo 触发");
    return () => name; // 返回一个函数
  }, [name]);

  // useCallback
  // const memo_getProductName = useCallback(() => {
  //   console.log("hhhhh");
  //   return name;
  // }, [name]);

  return (
    <Fragment>
      <p>{name}</p>
      <p>{price}</p>
      <p>普通的name：{getProductName()}</p>
      <p>memo化的：{memo_getProductName()}</p>
      <button onClick={() => setPrice(price + 1)}>价钱+1</button>
      <button
        onClick={() =>
          setName(nameList[(Math.random() * nameList.length) << 0])
        }
      >
        修改名字
      </button>
      <Counter initialCount={1}></Counter>
      <TextInputWithFocusButton></TextInputWithFocusButton>
      <FancyInput></FancyInput>
    </Fragment>
  );
};
export default Example;
