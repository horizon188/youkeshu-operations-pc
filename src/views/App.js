import React from "react";
import { connect } from "react-redux";
import "./App.less";
import { Tag, Space } from "antd";
import { Grid } from "component";
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
