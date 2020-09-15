import { createStore } from "redux";
import { tableSource } from "./../mock";
import { filterEmpty } from "./../utils";
import { get } from "lodash";
const initialState = {
  number: 0,
  TableData: {
    dataSource: tableSource,
    pageNum: 1,
    pageSize: 10,
  },
  showList: tableSource,
  selectedRowKeys: ["1"],
  modalParams: {
    name: "",
    Age: "",
    Address: "",
  },
};

const incrementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "pageChange": {
      state.TableData = { ...state.TableData, ...action.payload };
      return { ...state };
    }
    case "handleQuery": {
      let newShowList = handleQuery(state, action.payload);
      let obj = {
        showList: newShowList,
      };
      return { ...state, ...obj };
    }

    case "resetQuery": {
      console.log("state", state);
      let obj = {
        showList: state.TableData.dataSource,
      };
      return { ...state, ...obj };
    }
    case "showModal": {
      console.log("state", state);
      let obj = {
        modalParams: action.payload,
      };
      return { ...state, ...obj };
    }

    case "handleAdd": {
      console.log("state", state);
      let obj = {
        modalParams: action.payload,
      };
      return { ...state, ...obj };
    }
    case "handleOK": {
      console.log("state", state);
      let obj = {
        modalParams: action.payload,
      };
      return { ...state, ...obj };
    }

    case "saveState": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

const store = createStore(incrementReducer);

// 搜索
function handleQuery(state, values) {
  let {
    TableData: { dataSource },
  } = state;
  values = filterEmpty(values);
  let queryName = get(values, "name", null);
  let newShowList = [];
  newShowList = dataSource.filter((item) => {
    let name = true;
    console.log(
      'queryName && "" + item.name.indexOf(queryName) === "-1"',
      queryName && "" + item.name.indexOf(queryName) === "-1"
    );
    if (queryName && "" + item.name.indexOf(queryName) === "-1") {
      name = false;
    }
    return name;
  });

  return newShowList;
}
console.log("store", store.getState());
// store.getState()
// store.dispatch()
// store.subscribe()
export default store;
