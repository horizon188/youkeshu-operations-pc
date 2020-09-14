import React from "react";
import { connect } from "react-redux";
import "./QueryLess.less";
import { Form, InputNumber, Button, Input, Row, Select } from "antd";
import { get } from "lodash";

class QueryComponet extends React.Component {
  constructor(props) {
    super(props);
    this.id = Math.random().toString(36).substr(2, 10);
  }

  componentDidMount() {
    this.calLayout();
  }

  onFinish = (values) => {
    console.log(values);
  };

  //获取初始数据
  getInitValue = () => {
    if (this.itemList) {
      return this.itemList;
    }
    let queryEle = document.getElementById(this.id);
    let labelNodes = queryEle.querySelectorAll(".queryLabel");
    let contentNodes = queryEle.querySelectorAll(".queryContent");
    let labelWidths = Array.from(labelNodes).map((o) => o.offsetWidth);
    let contentWidths = Array.from(contentNodes).map((o) => o.offsetWidth);
    let itemList = [];
    let length = labelWidths.length;
    for (let i = 0; i < length; i++) {
      itemList.push({
        label: labelWidths[i],
        content: contentWidths[i],
        total: labelWidths[i] + contentWidths[i],
      });
    }
    this.itemList = itemList;
    return itemList;
  };

  //计算搜索栏布局
  calLayout = () => {
    //获取所有的宽度
    let queryEle = document.getElementById(this.id);
    let queryWidth = queryEle.offsetWidth;
    this.queryWidth = queryWidth;
    let itemList = this.getInitValue();
    // let maxList = [];
    // let length = itemList.length;
    // let cloneItemArr = [];
    // 一行多长
    let rowLength = 24; // 内边距24px
    // 一行放几个
    let rowNum = 0;
    try {
      itemList.map((item, index) => {
        console.log("queryWidth", queryWidth, rowLength);
        rowLength = rowLength + item.total + 24;
        if (queryWidth < rowLength) {
          console.log("2");
          rowNum = index;
          throw `一行多少个${rowNum}`;
        }
      });
    } catch (error) {
      console.log(error);
    }
    console.log("itemList", [...itemList]);
    if (itemList.length > rowNum) {
      for (let i = 0; i < rowNum; i++) {
        console.log("i", i);
        let maxLabelLength = itemList[i].label;
        let startIndex = i + rowNum;

        if (startIndex <= itemList.length) {
          for (
            let index = startIndex;
            index < itemList.length;
            index = index + rowNum
          ) {
            console.log("index", index);

            if (itemList[index].label > maxLabelLength) {
              maxLabelLength = itemList[index].label;
            }
          }
          for (
            let index = startIndex;
            index < itemList.length;
            index = index + rowNum
          ) {
            itemList[index].label = maxLabelLength;
          }
          itemList[i].label = maxLabelLength;
        }
      }
    }

    console.log("itemList", itemList);
    // for (let i = length; i > 0; i--) {
    //   cloneItemArr = this.formatMaxLabel(itemList, i);
    //   let arr = chunk(cloneItemArr, i);
    //   let flag = true;
    //   for (let item of arr) {
    //     if (this.getTotalWidth(item) >= queryWidth) {
    //       flag = false;
    //       break;
    //     }
    //   }
    //   if (flag) {
    //     maxList = arr[0].map((item) => item.label);
    //     break;
    //   }
    // }
    itemList.map((item, index) => {
      let nodes = queryEle.querySelectorAll(".queryLabel");
      Array.from(nodes).map((node, index) => {
        node.style.width = itemList[index].label + "px";
      });
    });
  };

  renderFields = (qField, index) => {
    const { defaultValues = {}, colLayout, searchFormItem } = this.props;
    const {
      elem_type,
      zh_name,
      en_name,
      required = false,
      options = [],
    } = qField;
    let content = null;
    let extProps = get(qField, "extProps", {}); //补充属性

    switch (elem_type) {
      case "Input":
        content = (
          <Form.Item name={en_name}>
            <Input placeholder="placeholder" />
          </Form.Item>
        );
        break;
      case "Select":
        content = (
          <Form.Item name={en_name}>
            <Select
              style={{ width: "224px" }}
              placeholder={`请选择${zh_name}`}
              {...extProps}
            >
              {options.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
        break;
      case "InputNumber":
        content = (
          <Form.Item name={en_name}>
            <InputNumber
              style={{ width: "224px" }}
              placeholder={`请输入${zh_name}`}
              onPressEnter={this.onSearch}
            />
          </Form.Item>
        );
        break;
    }
    return (
      <div className="queryItem" key={en_name}>
        <div className="queryLabel">{zh_name}</div>
        <div className="queryContent">{content}</div>
      </div>
    );
  };

  render() {
    //渲染表单项
    let { queryConfig } = this.props;
    return (
      <div className={"query"} id={this.id}>
        <Form layout={"inline"} onFinish={this.onFinish}>
          <div className={"queryForm"}>
            {queryConfig &&
              queryConfig.map((item) => {
                return this.renderFields(item);
              })}
          </div>
        </Form>
      </div>
    );
  }
}
export default QueryComponet;
