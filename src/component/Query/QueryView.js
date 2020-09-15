import React from "react";
import { connect } from "react-redux";
import "./QueryLess.less";
import { Form, InputNumber, Button, Input, Row, Select } from "antd";
import { get } from "lodash";

class QueryComponet extends React.Component {
  constructor(props) {
    super(props);
    this.id = Math.random().toString(36).substr(2, 10);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.calLayout();
  }

  onFinish = (values) => {
    let { onSearch } = this.props;
    onSearch(values);
  };

  onReset = () => {
    let { onReset } = this.props;
    onReset();
    this.formRef.current.resetFields();
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

  // 动态设置label大小
  setLabelLength = (itemList, rowNum) => {
    let queryEle = document.getElementById(this.id);
    if (itemList.length > rowNum) {
      for (let i = 0; i < rowNum; i++) {
        let maxLabelLength = itemList[i].label;
        let startIndex = i + rowNum;

        if (startIndex <= itemList.length) {
          for (
            let index = startIndex;
            index < itemList.length;
            index = index + rowNum
          ) {
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
    itemList.map((item, index) => {
      let nodes = queryEle.querySelectorAll(".queryLabel");
      Array.from(nodes).map((node, index) => {
        node.style.width = itemList[index].label + "px";
      });
    });
  };
  //计算搜索栏布局
  calLayout = () => {
    //获取所有的宽度
    let queryEle = document.getElementById(this.id);
    let queryWidth = queryEle.offsetWidth;
    this.queryWidth = queryWidth;
    let itemList = this.getInitValue();
    // 一行多长
    let rowLength = 24; // 内边距24px
    // 一行放几个
    let rowNum = 0;
    try {
      itemList.map((item, index) => {
        rowLength = rowLength + item.total + 24;
        if (queryWidth < rowLength) {
          rowNum = index;
          throw `一行多少个${rowNum}`;
        }
      });
    } catch (error) {
      console.log(error);
    }
    this.setLabelLength(itemList, rowNum);
  };

  renderFields = (qField, index) => {
    const { queryConfig } = this.props;
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
            <Input
              style={{ width: "224px" }}
              placeholder={`请选择${zh_name}`}
              {...extProps}
            />
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
              {...extProps}
            />
          </Form.Item>
        );
        break;
    }
    return (
      <div className="queryItem" key={en_name}>
        <div className="queryLabel">{zh_name}</div>
        <div className="queryContent">{content}</div>
        {queryConfig && queryConfig.length === index + 1 && (
          <div style={{ display: "flex" }}>
            <Button type="primary" className="mgr24 mgl24" htmlType="submit">
              搜索
            </Button>
            <Button onClick={() => this.onReset()}>重置</Button>
          </div>
        )}
      </div>
    );
  };

  render() {
    //渲染表单项
    let { queryConfig } = this.props;
    return (
      <div className={"query"} id={this.id}>
        <Form layout={"inline"} onFinish={this.onFinish} ref={this.formRef}>
          <div className={"queryForm"}>
            {queryConfig &&
              queryConfig.map((item, index) => {
                return this.renderFields(item, index);
              })}
          </div>
        </Form>
      </div>
    );
  }
}
export default QueryComponet;
