import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory";
import { getGraph } from "../../api/model/money-logs";
import Navbar from "../../components/Navbar";
import Select from "../../components/Select";
import DoughnutChart from "../../components/DoughnutChart";

const Graph = () => {
  const defaultMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const start = new Date(year, month, 1).toLocaleDateString("sv-SE");
    const end = new Date(year, month + 1, 0).toLocaleDateString("sv-SE");

    return {
      start: start,
      end: end,
      m: now.toLocaleString("default", { month: "long" }),
    };
  };

  const getColorScale = (count) => {
    return chroma
      .scale(["0061FF", "FFE100", "EE7F77"])
      .mode("lch") // or "lab" or "hsl"
      .colors(count);
  };
  const { start, end, m } = defaultMonth();
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [month, setMonth] = useState(m);
  const [week, setWeek] = useState({ name: "Full Month", value: "full" });
  const [income, setIncome] = useState({});
  const [expense, setExpense] = useState({});
  const [errorMsgIncome, setErrorMsgIncome] = useState("");
  const [errorMsgExpense, setErrorMsgExpense] = useState("");
  const [incomeColor, setIncomeColor] = useState([]);
  const [expenseColor, setExpenseColor] = useState([]);

  const fetchGraphIncome = async () => {
    try {
      const res = await getGraph(startDate, endDate, "income");
      setIncome(res.data.data);
      setIncomeColor(getColorScale(res.data.data.items.length));
      setErrorMsgIncome("");
    } catch (error) {
      setErrorMsgIncome(error.response?.data.metadata.message);
    }
  };

  const fetchGraphExpense = async () => {
    try {
      const res = await getGraph(startDate, endDate, "expense");
      setExpense(res.data.data);
      setExpenseColor(getColorScale(res.data.data.items.length));
      setErrorMsgExpense("");
    } catch (error) {
      setErrorMsgExpense(error.response?.data.metadata.message);
    }
  };

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleChangeMonth = (e) => {
    const [year, monthNum] = e.split("-").map(Number);
    const start = new Date(year, monthNum - 1, 1).toLocaleDateString("sv-SE");
    const end = new Date(year, monthNum, 0).toLocaleDateString("sv-SE");

    setMonth(
      new Date(year, monthNum - 1).toLocaleString("default", {
        year: "numeric",
        month: "long",
      })
    );
    setStartDate(start);
    setEndDate(end);
    setWeek({ name: "Full Month", value: "full" });
  };

  const handleChangeWeek = (e) => {
    const val = e.target.value;
    const [year, monthNum] = startDate.split("-").map(Number);
    var start, end;
    switch (val) {
      case "full":
        start = new Date(year, monthNum - 1, 1).toLocaleDateString("sv-SE");
        end = new Date(year, monthNum, 0).toLocaleDateString("sv-SE");
        break;
      case "week1":
        start = new Date(year, monthNum - 1, 1).toLocaleDateString("sv-SE");
        end = new Date(year, monthNum - 1, 8).toLocaleDateString("sv-SE");
        break;
      case "week2":
        start = new Date(year, monthNum - 1, 9).toLocaleDateString("sv-SE");
        end = new Date(year, monthNum - 1, 16).toLocaleDateString("sv-SE");
        break;
      case "week3":
        start = new Date(year, monthNum - 1, 17).toLocaleDateString("sv-SE");
        end = new Date(year, monthNum - 1, 24).toLocaleDateString("sv-SE");
        break;
      case "week4":
        start = new Date(year, monthNum - 1, 25).toLocaleDateString("sv-SE");
        end = new Date(year, monthNum, 0).toLocaleDateString("sv-SE");
        break;
    }
    setWeek(e.target);
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    fetchGraphExpense();
    fetchGraphIncome();
  }, [startDate, endDate]);

  return (
    <>
      <Navbar />
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <p className="text-2xl lg:text-4xl font-bold mb-2 ">Graph Chart</p>
          <div className="flex flex-col space-y-5 md:flex-row justify-end mb-8">
            <div className="flex flex-row items-center space-x-3">
              <p className="text-[#737373] font-light">Month</p>
              <input
                className="bg-white shadow-input rounded-lg py-3 px-5 text-left text-[#737373] sm:text-sm/6"
                type="month"
                onChange={(e) => handleChangeMonth(e.target.value)}
                name="month"
                defaultValue={new Date().toISOString().slice(0, 7)}
              />
              <Select
                placeholder={week.name}
                name="type"
                onChange={handleChangeWeek}
                value={week}
                option={[
                  { name: "Full Month", value: "full" },
                  { name: "Week 1", value: "week1" },
                  { name: "Week 2", value: "week2" },
                  { name: "Week 3", value: "week3" },
                  { name: "Week 4", value: "week4" },
                ]}
              />
            </div>
          </div>

          <div className="shadow-sm rounded-xl bg-white p-5 mt-10">
            <p className="text-center font-semibold text-lg">{month}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
              <div className="flex justify-center">
                <DoughnutChart
                  errorMsg={errorMsgIncome}
                  data={income}
                  total={formatToIDR(income.totalAmount)}
                  colors={incomeColor}
                  label={"Your income this month"}
                ></DoughnutChart>
              </div>
              <div className="flex justify-center">
                <DoughnutChart
                  errorMsg={errorMsgExpense}
                  data={expense}
                  total={formatToIDR(expense.totalAmount)}
                  colors={expenseColor}
                  label={"Your expese this month"}
                ></DoughnutChart>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-5 mt-5">
            <div className="bg-white md:w-1/2 rounded-xl shadow-sm px-8 py-4">
              <p className="text-xl font-semibold border-b-1 pb-3 border-[#EDEDED] text-center">
                Income
              </p>
              {errorMsgIncome == "" ? (
                <div className="grid divide-y divide-[#EDEDED]">
                  {income.items?.map((item, key) => (
                    <div
                      className="flex justify-between items-center py-3"
                      key={key}
                    >
                      <div className="flex space-x-2 items-center">
                        <div
                          style={{ backgroundColor: incomeColor[key] }}
                          className="font-semibold text-white text-sm rounded-md py-1 px-2"
                        >
                          {Number(item.percentage).toFixed(1)}%
                        </div>
                        <p>{item.category}</p>
                      </div>
                      <p>{formatToIDR(item.amount)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="my-auto py-15 text-center">Data not found</p>
              )}
            </div>
            <div className="bg-white md:w-1/2 rounded-xl shadow-sm px-8 py-4 mt-8 md:mt-0">
              <p className="text-xl font-semibold border-b-1 pb-3 border-[#EDEDED] text-center">
                Expense
              </p>
              {errorMsgExpense == "" ? (
                <div className="grid divide-y divide-[#EDEDED]">
                  {expense.items?.map((item, key) => (
                    <div
                      className="flex justify-between items-center py-3"
                      key={key}
                    >
                      <div className="flex space-x-2 items-center">
                        <div
                          style={{ backgroundColor: expenseColor[key] }}
                          className="bg-blue-500 font-semibold text-white text-sm rounded-sm py-1 px-2"
                        >
                          {Number(item.percentage).toFixed(1)}%
                        </div>
                        <p>{item.category}</p>
                      </div>
                      <p>{formatToIDR(item.amount)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="my-auto py-15 text-center">Data not found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
