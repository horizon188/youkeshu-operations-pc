import React from "react";
import { connect } from "react-redux";
import "./GridLess.less";
import { Table, Tag, Space } from "antd";
class TableComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelectInfoChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  };
  render() {
    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
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

    // 消息模板列表的勾选
    const rowSelection = {
      selectedRowKeys: ["1"],
      onChange: this.onSelectInfoChange,
    };

    /**
     * 页码控制
     * pageChange, total, pageNum, pageSize
     */
    const pagination = ({
      pageChange,
      total,
      pageNum,
      pageSize,
      paginationProps = {},
    }) => {
      const { pageSizeOptions, defaultPageSize } = pageConfig;
      return {
        showTotal: (total) => `共 ${total} 条`,
        total,
        onChange: (pageNum, pageSize) => pageChange(pageNum, pageSize),
        pageSizeOptions,
        onShowSizeChange: (pageNum, pageSize) => pageChange(pageNum, pageSize),
        showSizeChanger: true,
        showQuickJumper: true,
        current: Number(pageNum),
        pageSize: Number(pageSize),
        hideOnSinglePage: true,
        ...paginationProps,
      };
    };
    return (
      <div className={"tableComponet"}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          rowSelection={rowSelection}
          pagination={
            pageChange
              ? pagination({
                  pageChange,
                  total,
                  pageNum,
                  pageSize,
                  paginationProps,
                })
              : false
          }
        />
      </div>
    );
  }
}
export default TableComponent;
