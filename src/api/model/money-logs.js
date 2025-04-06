import { coreApi } from "..";

export const getSummary = (startDate, endDate) => {
  return coreApi.get(
    `/money-logs/summary?startDate=${startDate}&endDate=${endDate}`
  );
};

export const getGraph = (startDate, endDate, type) => {
  return coreApi.get(
    `/money-logs/graph?type=${type}&startDate=${startDate}&endDate=${endDate}`
  );
};

export const createMoneyLogs = (amount, type, date, category, notes) => {
  const param = {
    amount: amount,
    type: type,
    category: category,
    date: date,
    notes: notes,
  };
  return coreApi.post("/money-logs/create", param);
};
