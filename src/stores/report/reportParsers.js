import _get from "lodash.get";
const reportParsers = {};

reportParsers.getEarningStats = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return [];
  }

  return res.map((item, i) => {
    return {
      amount: _get(item, "amount", null),
      month: _get(item, "month", ""),
    };
  });
};

export { reportParsers };
