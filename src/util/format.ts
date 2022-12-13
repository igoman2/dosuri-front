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
