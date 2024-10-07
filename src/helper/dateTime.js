const dayData = [
  { d: "1", dd: "01", ddd: "Sun", dddd: "Sunday" },
  { d: "2", dd: "02", ddd: "Mon", dddd: "Monday" },
  { d: "3", dd: "03", ddd: "Tue", dddd: "Tueday" },
  { d: "4", dd: "04", ddd: "Wed", dddd: "Wednesday" },
  { d: "5", dd: "05", ddd: "Thu", dddd: "Thursday" },
  { d: "6", dd: "06", ddd: "Fri", dddd: "Friday" },
  { d: "7", dd: "07", ddd: "Sat", dddd: "Satday" },
];

const monthData = [
  {
    M: "1",
    MM: "01",
    MMM: "Jan",
    MMMM: "January",
  },
  {
    M: "2",
    MM: "02",
    MMM: "Feb",
    MMMM: "February",
  },
  {
    M: "3",
    MM: "03",
    MMM: "Mar",
    MMMM: "March",
  },
  {
    M: "4",
    MM: "04",
    MMM: "Apr",
    MMMM: "April",
  },
  {
    M: "5",
    MM: "05",
    MMM: "May",
    MMMM: "May",
  },
  {
    M: "6",
    MM: "06",
    MMM: "Jun",
    MMMM: "June",
  },
  {
    M: "7",
    MM: "07",
    MMM: "Jul",
    MMMM: "July",
  },
  {
    M: "8",
    MM: "08",
    MMM: "Aug",
    MMMM: "August",
  },
  {
    M: "9",
    MM: "09",
    MMM: "Sep",
    MMMM: "September",
  },
  {
    M: "10",
    MM: "10",
    MMM: "Oct",
    MMMM: "October",
  },
  {
    M: "11",
    MM: "11",
    MMM: "Nov",
    MMMM: "November",
  },
  {
    M: "12",
    MM: "12",
    MMM: "Dec",
    MMMM: "December",
  },
];

const timeUnit = {
  a: ["am", "pm"],
  A: ["AM", "PM"],
};

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const dateTimeHelper = {};

dateTimeHelper.parse = (date) => {
  if (!date) {
    return "";
  }

  if (date.constructor === Date) {
    return date;
  }

  return new Date(date);
};

dateTimeHelper.format = (theDate = "", format = "$DD $MMM $YY, $hh:$mm $A") => {
  let isNaNStatus = 0;
  let parsedDate = Date.parse(theDate);
  if (isNaN(parsedDate)) {
    isNaNStatus = 1;
    parsedDate = `${theDate.split(" ")[0]}T${theDate.split(" ")[1]}`;

    return "";
  }

  parsedDate = new Date(parsedDate);

  let day = parsedDate.getDay();
  let month = parsedDate.getMonth();
  let date = parsedDate.getDate();
  let year = parsedDate.getFullYear();
  let hours = parsedDate.getHours();
  let minutes = parsedDate.getMinutes();
  let seconds = parsedDate.getSeconds();

  if (isNaNStatus) {
    day = parsedDate.getUTCDay();
    month = parsedDate.getUTCMonth();
    date = parsedDate.getUTCDate();
    year = parsedDate.getUTCFullYear();
    hours = parsedDate.getUTCHours();
    minutes = parsedDate.getUTCMinutes();
    seconds = parsedDate.getUTCSeconds();
  }

  let formatDate = format;
  // replace with day
  formatDate = formatDate.replace("$dddd", dayData[day].dddd);
  formatDate = formatDate.replace("$ddd", dayData[day].ddd);
  formatDate = formatDate.replace("$dd", dayData[day].dd);
  formatDate = formatDate.replace("$d", dayData[day].d);

  // replace with month
  formatDate = formatDate.replace("$MMMM", monthData[month].MMMM);
  formatDate = formatDate.replace("$MMM", monthData[month].MMM);
  formatDate = formatDate.replace("$MM", monthData[month].MM);
  formatDate = formatDate.replace("$M", monthData[month].M);

  // replace with year
  formatDate = formatDate.replace("$YYYY", `${year}`);
  formatDate = formatDate.replace("$YY", `${year}`.substring(2));

  // replace with date
  formatDate = formatDate.replace("$DD", date < 10 ? `0${date}` : `${date}`);
  formatDate = formatDate.replace(
    "$Do",
    date < 10 ? `0${date}${nth(date)}` : `${date}${nth(date)}`
  );
  formatDate = formatDate.replace("$D", `${date}`);

  if (formatDate.includes("$a") || formatDate.includes("$A")) {
    // calculate 12 hours and timeUnit in am/pm
    const unitA = hours < 12 ? timeUnit.A[0] : timeUnit.A[1];
    const unita = hours < 12 ? timeUnit.a[0] : timeUnit.a[1];
    hours = hours < 12 ? hours : hours - 12;

    // replace am pm
    formatDate = formatDate.replace("$A", unitA);
    formatDate = formatDate.replace("$a", unita);
  }

  // replace with hours
  formatDate = formatDate.replace("$hh", hours < 10 ? `0${hours}` : `${hours}`);
  formatDate = formatDate.replace("$h", `${hours}`);

  // replace with minutes
  formatDate = formatDate.replace(
    "$mm",
    minutes < 10 ? `0${minutes}` : `${minutes}`
  );
  formatDate = formatDate.replace("$m", `${minutes}`);

  // replace with seconds
  formatDate = formatDate.replace(
    "$ss",
    seconds < 10 ? `0${seconds}` : `${seconds}`
  );
  formatDate = formatDate.replace("$s", `${seconds}`);

  return formatDate;
};

dateTimeHelper.dateOfBirth = (date) =>
  dateTimeHelper.format(date, "$DD-$MM-$YYYY");

dateTimeHelper.sipDate = (date) => dateTimeHelper.format(date, "$YYYY-$MM-$DD");

dateTimeHelper.displayDate = (date) =>
  date ? dateTimeHelper.format(date, "$Do $MMM $YYYY") : "";

dateTimeHelper.now = () => new Date();

dateTimeHelper.diff = (date1, date2) => {
  date1 = dateTimeHelper.parse(date1);
  date2 = dateTimeHelper.parse(date2);

  const diff = date2.getTime() - date1.getTime();
  const isNegative = diff < 0;

  const days = Math.abs(Math.round(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(Math.round(diff / (1000 * 60 * 60)) - days * 24);
  const minutes = Math.abs(Math.round(diff / (1000 * 60)) - hours * 60);

  return {
    days: isNegative ? -days : days,
    hours: isNegative ? -hours : hours,
    minutes: isNegative ? -minutes : minutes,
  };
};

dateTimeHelper.isSubscriptionExpiring = (date) => {
  if (!date) {
    return { isExpiring: null, expireInDays: null };
  }
  const today = dateTimeHelper.now();
  const diff = dateTimeHelper.diff(today, date);

  return {
    isExpiring: diff.days >= 0 && diff.days <= 3,
    expireInDays: diff.days,
  };
};

export { dateTimeHelper };
