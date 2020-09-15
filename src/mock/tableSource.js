export default (function () {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let result = arr.map((item) => {
    return {
      key: "" + item,
      name: `${item}`,
      age: "" + item,
      address: "New York No. 1 Lake Park",
    };
  });
  return result;
})();
