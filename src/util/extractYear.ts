import dayjs from "dayjs";

export const getCurrentDateMinusYears = (years: number): string => {
  const currentDate = dayjs();
  const pastDate = currentDate.subtract(years, "year");
  return pastDate.toISOString(); // ISO 형식으로 변환하여 리턴 (예: "2023-07-23T00:00:00.000Z")
};
