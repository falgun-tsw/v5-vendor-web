const dataHelper = {};

dataHelper.sorter = (a, b, type = "string") => {
  if ([undefined, null].includes(a)) {
    return -1;
  }

  if ([undefined, null].includes(b)) {
    return 1;
  }

  if (a === b) {
    return 0;
  }

  if (type === "string") {
    return a.length - b.length;
  }

  if (type === "number") {
    return a - b;
  }

  if (type === "date") {
    return new Date(a) - new Date(b);
  }
};

dataHelper.deepCopy = (data) => {
  data = JSON.stringify(data);

  return JSON.parse(data);
};

dataHelper.generateUniqueId = () =>
  `DEVICEID_${Math.floor(Math.random() * 100)}${Date.now()}`;

dataHelper.removeHTML = (data) => {
  const regex = /(<([^>]+)>)/ig;
  data = data.replace(regex, "");
  return data;
};

dataHelper.deepMerge = (...args) => {
  let target = {}
  let i = 0

  const _merger = (obj) => {
    for (let key in obj) {
      if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
        target[key] = _merger(target[key], obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  
  for (; i < args.length; i++) {
    _merger(args[i])
  }

  return target
}

export { dataHelper };
