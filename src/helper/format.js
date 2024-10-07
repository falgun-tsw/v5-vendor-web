import { config } from "@app/config/index";
const formatHelper = {};

formatHelper.currency = (
  value = 0,
  options = { config: {} },
  locale = "en-IN"
) => {
  // NOTE:
  //      refer config document from below link
  //      link: https://www.techonthenet.com/js/number_tolocalestring.php
  const config = {
    currency: "INR",
    style: "currency",
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options.config,
  };

  if (value === 0) {
    config.maximumFractionDigits = 0;
  }

  config.minimumFractionDigits = config.maximumFractionDigits;

  let fixedValue = Number(Number(value).toFixed(config.maximumFractionDigits));
  return fixedValue.toLocaleString(locale, config);
};

formatHelper.getImageURI = (slug = null) => {
  if (!slug) {
    return;
  }
  let slash = "";
  if (slug.slice(0, 1) !== "/") {
    slash = "/";
  }
  return `${config.apiUrl}${slash}${slug}`;
};

formatHelper.parseDecimal = (value = null) => {
  if (!value) {
    return;
  }
  return Number(Number(value).toFixed(2));
};

formatHelper.sentenceCase = (str) =>
  str
    .split(" ")
    .map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}`)
    .join(" ");

formatHelper.withZero = (n = 0) => {
  return `0${n}`.substr(-2);
};

formatHelper.getQtyInSlash = (qPending, qFrom, showSameQty = false) => {
  let qtyString = "";
  let q1 = qFrom || qFrom === 0 ? qFrom : "";
  let q2 = qPending || qPending === 0 ? qPending : "";

  if (q1 <= q2 && showSameQty) {
    qtyString = q1;
  } else {
    qtyString = `${q2} / ${q1}`;
  }
  return qtyString;
};

formatHelper.checkVowel = (word) => {
  return ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"].includes(
    word.charAt(0)
  );
};

export { formatHelper };
