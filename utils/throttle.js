const Throttle = function (callback, delay) {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, delay);
  };
};

export default Throttle;
