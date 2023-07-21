import dayjs from "dayjs";

/**
 *
 * @param string 전화번호
 * @returns 00-0000-0000 | 000-0000-0000 | 000-000-0000
 */
export const formatPhoneNumber = (str: string) => {
  if (typeof str !== "string") return "";
  str = str.replace(/[^0-9]/g, "");
  if (str.indexOf("82") == 0) {
    return str.replace(/(^82)(2|\d{2})(\d+)?(\d{4})$/, "+$1-$2-$3-$4"); // +82
  } else if (str.indexOf("1") == 0) {
    return str.replace(/(^1\d{3})(\d{4})$/, "$1-$2"); // 1588, 1566, 1677, ...
  }
  return str.replace(/(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/, "$1-$2-$3"); // 02/0504/0505/010/011/031
};

/**
 *
 * @param phoneNumberMiddle
 * @example '99164003' => '010-9916-4003'
 */
export const formatPartialPhoneNumberToComplete = (
  phoneNumberMiddle: string
) => {
  return `010-${phoneNumberMiddle.substring(
    0,
    4
  )}-${phoneNumberMiddle.substring(4, 8)}`;
};

/**
 * @param phoneNumber
 * @example 010-9916-4003 => 99164003
/**
 
 */
export const formatPhoneNumber_00000000 = (phoneNumber: string) => {
  if (!phoneNumber) {
    return "";
  }

  return phoneNumber.replaceAll("-", "").replace("010", "");
};

export const parseBirthday = (dateStr: string) => {
  return `${dateStr.substring(0, 4)}-${dateStr.substring(
    4,
    6
  )}-${dateStr.substring(6, 8)}`;
};

/**
 * @param dayString
 * @example 2020-02-06T13:39:45.148Z(ISOString) => 20220206
 */
export const formatDate_YYYYMMDD = (dayString: string) => {
  if (!dayString) {
    return "";
  }

  return dayjs(dayString).format("YYYYMMDD");
};

/**
 * @param dayString
 * @example 2020-02-06T13:39:45.148Z(ISOString) => 2022.02.06.
 */
export const formatDate_YYYY_MM_DD = (dayString: string) => {
  if (!dayString) {
    return "";
  }

  return dayjs(dayString).format("YYYY.MM.DD.");
};

export const addComma = (value: string) => {
  return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
};

export const removeComma = (value: string) => {
  return value.replace(/[^\d]+/g, "");
};

/**
 * @param money
 * @example 172,200 -> 17.2만원
 *
 */
export const formatMoney = (money: number) => {
  if (isNaN(money)) {
    throw new Error("Invalid input. Please provide a valid number.");
  }

  const suffixes = ["", "만", "억", "조", "경"]; // Add more if needed

  let num = Math.abs(money);
  let suffixIndex = 0;

  while (num >= 10000 && suffixIndex < suffixes.length - 1) {
    num /= 10000;
    suffixIndex++;
  }

  const formattedNumber = new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    maximumFractionDigits: 1,
  }).format(num);

  return `${formattedNumber}${suffixes[suffixIndex]}원`;
};
