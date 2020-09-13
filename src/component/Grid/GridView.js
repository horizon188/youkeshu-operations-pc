import React from "react";
import { connect } from "react-redux";
import "./GridLess.less";
import { Table, Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
//分页配置
const pageConfig = {
  pageSizeOptions: ["10", "20", "30", "40"],
  defaultPageSize: 10,
};
class TableComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      pageChange,
      scroll,
      data,
      rowSelection,
      paginationProps,
      batchBtns,
      ...restProps
    } = this.props;
    const { dataSource, columns, total = 0, pageNum = 1, pageSize = 10 } = data;
    console.log("batchBtns", batchBtns);
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
    const menu = () => {
      let arr = [];
      batchBtns.map((item) => {
        if (item.dropdown) {
          arr.push(item);
        }
      });
      return (
        <Menu>
          {arr.map((item, index) => {
            return (
              <Menu.Item key={index}>
                <span onClick={item.onClick}>{item.text}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      );
    };
    const beforeInfo = (item, index) => {
      switch (item.dropdown) {
        case true:
          return (
            <div style={{ marginRight: "auto" }} key={index}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button>
                  批量操作
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          );
        default:
          return (
            <div key={index} className="mgl24">
              <Button type={item.type} onClick={item.onClick}>
                {item.text}
              </Button>
            </div>
          );
      }
    };
    return (
      <div className={"tableComponet"}>
        {/* 表格前的节点 */}
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="mgb24"
        >
          {batchBtns &&
            batchBtns.map((item, index) => {
              return beforeInfo(item, index);
            })}
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          rowSelection={rowSelection}
          pagination={pagination({
            pageChange,
            total,
            pageNum,
            pageSize,
            paginationProps,
          })}
          {...restProps}
        />
      </div>
    );
  }
}
export default TableComponent;
