import React from "react";
import { connect } from "react-redux";
import "./App.less";
import { Tag, Space, Modal, Form, Input, Button } from "antd";
import { Grid, Query } from "component";
import ModalConponet from "./modal";
import "./../assets/fontIcon/iconfont";
import "./../assets/fontIcon/iconfont.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      actionType: "",
    };
    console.log(
      setTimeout(function () {
        console.log("3");
      }, 1000),

      new Promise(function (resolve) {
        console.log("1");
        resolve();
      }).then(function () {
        console.log("444");
      }),

      console.log("2")
    );
  }

  // 列表勾选
  onSelectInfoChange = (selectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys", selectedRowKeys);
    this.props.dispatch({
      type: "saveState",
      payload: { selectedRowKeys },
    });
  };
  // 处理分页
  handlePageChange = (pageNum, pageSize) => {
    let payload = { pageNum, pageSize };
    this.props.dispatch({
      type: "pageChange",
      payload,
    });
  };

  // 列表搜索
  handleQuery = (values) => {
    this.props.dispatch({
      type: "handleQuery",
      payload: values,
    });
  };

  // 列表搜索
  resetQuery = () => {
    this.props.dispatch({
      type: "resetQuery",
    });
  };

  showModal = (record, actionType) => {
    this.props.dispatch({
      type: "showModal",
      payload: record,
    });
    this.setState({ visible: true, actionType });
  };

  //查询条件
  get queryConfig() {
    return [
      {
        elem_type: "Input",
        zh_name: "名字",
        en_name: "name",
      },
      {
        elem_type: "Input",
        zh_name: "模版",
        en_name: "name1",
        extProps: { disabled: true },
      },
      {
        elem_type: "Select",
        zh_name: "类型莫",
        en_name: "msgType",
        extProps: { disabled: true },

        options: [
          {
            value: null,
            label: "全部",
          },
          {
            value: "1",
            label: "短信",
          },
        ],
      },
      {
        elem_type: "InputNumber",
        zh_name: "更新账号",
        en_name: "updatePerson",
        extProps: { disabled: true },
      },
      {
        elem_type: "Select",
        zh_name: "状态",
        en_name: "status",
        extProps: { disabled: true },

        options: [
          {
            value: null,
            label: "全部",
          },
          {
            value: "4",
            label: "启用中",
          },
          {
            value: "0",
            label: "待启用",
          },
          {
            value: "3",
            label: "已禁用",
          },
        ],
      },
    ];
  }

  // 列表上的按钮
  get beforeTable() {
    return [
      {
        actionType: "action",
        type: "primary",
        position: "left",
        dropdown: true,
        text: "批量开启",
        isConfirm: true,
        onClick: () => {
          console.log("dinaji");
        },
      },
      {
        actionType: "action",
        type: "primary",
        position: "right",
        // dropdown: true,
        text: "新增",
        isConfirm: true,
        onClick: () => {
          this.showModal({}, "add");
        },
      },
    ];
  }

  get columns() {
    return [
      {
        title: "Name",
        dataIndex: ["xx", "yy", "www"],
        key: "name",
        render: (text) => <i class="iconfont">&#xe69c;</i>,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        render: (text) => <i class="iconfont iconxianxinghongliu"></i>,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (text) => (
          <svg class="icon" aria-hidden="true">
            <use xlinkHref="#iconxianxingsuosuoshu"></use>
          </svg>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => this.showModal(record, "edit")}>编辑</a>
            <a onClick={() => this.showModal(record, "detail")}>详情</a>
          </Space>
        ),
      },
    ];
  }

  render() {
    let { visible, actionType } = this.state;
    const rowSelection = {
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: this.onSelectInfoChange,
    };
    return (
      <div className={"app"}>
        <div className="mgb24">
          <Query
            queryConfig={this.queryConfig}
            onSearch={(values) => this.handleQuery(values)}
            onReset={() => this.resetQuery()}
          ></Query>
        </div>

        <Grid
          data={{
            ...this.props.TableData,
            dataSource: this.props.showList,
            columns: this.columns,
          }}
          rowSelection={rowSelection}
          pageChange={(pageNum, pageSize) => {
            this.handlePageChange(pageNum, pageSize);
          }}
          batchBtns={this.beforeTable}
        ></Grid>
        {visible && (
          <ModalConponet
            visible={visible}
            initialValues={this.props.modalParams}
            onCancel={() => this.setState({ visible: false })}
            onOk={(values) => {
              console.log("模态框确认", values);
            }}
            actionType={actionType}
          ></ModalConponet>
        )}
      </div>
    );
  }
}
export default connect((state) => ({
  TableData: state.TableData,
  tableSource: state.tableSource,
  selectedRowKeys: state.selectedRowKeys,
  showList: state.showList,
  modalParams: state.modalParams,
}))(App);
