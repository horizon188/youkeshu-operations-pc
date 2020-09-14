import React from "react";
import { connect } from "react-redux";
import "./App.less";
import { Tag, Space } from "antd";
import { Grid, Query } from "component";
import { tableSource } from "./../mock";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    this.props.dispatch({
      type: "INCREMENT",
    });
    //   this.props.history.push('/about/')
  }
  onSelectInfoChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  };
  render() {
    //查询条件
    const queryConfig = [
      {
        elem_type: "Input",
        zh_name: "模版ID",
        en_name: "code",
      },
      {
        elem_type: "Input",
        zh_name: "模版名称",
        en_name: "name",
      },
      {
        elem_type: "Select",
        zh_name: "类型",
        en_name: "msgType",
        options: [
          {
            value: null,
            label: "全部",
          },
          {
            value: "1",
            label: "短信",
          },
          {
            value: "4",
            label: "微信",
          },
          {
            value: "6",
            label: "支付宝信息",
          },
          {
            value: "3",
            label: "APP 站内信",
          },
          {
            value: "5",
            label: "APP PUSH",
          },
        ],
      },
      {
        elem_type: "Input",
        zh_name: "更新账号",
        en_name: "updatePerson",
      },
      {
        elem_type: "Select",
        zh_name: "状态",
        en_name: "messageTemplateStatus",
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
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    const batchBtns = () => {
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
          text: "批量开启",
          isConfirm: true,
          onClick: () => {
            console.log("dinaji");
          },
        },
      ];
    };
    let TableData = {
      dataSource: tableSource,
      columns,
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
    const rowSelection = {
      selectedRowKeys: ["1"],
      onChange: this.onSelectInfoChange,
    };
    return (
      <div className={"app"}>
        <div className="mgb24">
          <Query
            queryConfig={queryConfig}
            onSearch={(e) => console.log(e)}
            onReset={(e) => console.log(e)}
          ></Query>
        </div>

        <Grid
          data={{ ...TableData }}
          rowSelection={rowSelection}
          pageChange={(pageNum, pageSize) => {
            console.log({ pageNum, pageSize });
          }}
          batchBtns={batchBtns()}
        ></Grid>
      </div>
    );
  }
}
export default connect((state) => ({
  number: state.number,
}))(App);
