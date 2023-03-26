//单例模式，使用闭包保存所存的实例

const getSingle = function (fn) {
  let instance = null;
  return function () {
    return instance || (instance = fn.apply(this, arguments));
  };
};

export default getSingle
