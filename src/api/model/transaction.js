import { coreApi } from "..";

export const getTransaction = (
  page = 0,
  size = 10,
  sort = "desc",
  sortyBy = "createdAt"
) => {
  return coreApi.get(
    `/transactions?page=${page}&size=${size}&sort=${sortyBy},${sort}`
  );
};

export const transfer = (receipentAccountNo, amount, notes, category) => {
  const param = {
    receipentAccountNo: receipentAccountNo,
    amount: amount,
    notes: notes,
    category: category,
  };
  return coreApi.post("/transactions/transfer", param);
};

export const topup = (paymentMethod, amount, notes) => {
  const param = {
    paymentMethod: paymentMethod,
    amount: amount,
    notes: notes,
  };
  return coreApi.post("/transactions/topup", param);
};
