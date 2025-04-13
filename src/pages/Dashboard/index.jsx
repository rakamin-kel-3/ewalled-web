import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAccount } from "../../api/model/account";
import { getSummary } from "../../api/model/money-logs";
import iconlogo from "../../assets/iconlogo.svg";
import Navbar from "../../components/Navbar";
import Select from "../../components/Select";
import Table from "../../components/Table";
import AccountAmount from "../../components/AccountAmount";

const Dashboard = () => {
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

  const { start, end, m } = defaultMonth();
  const [account, setAccount] = useState({});
  const [summary, setSummary] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [month, setMonth] = useState(m);
  const [week, setWeek] = useState({ name: "Full Month", value: "full" });
  const [isBalanceShow, setIsBalanceShow] = useState(true);
  const Icons = {
    balance: isBalanceShow ? EyeIcon : EyeSlashIcon,
  };

  const fetchSummary = async () => {
    try {
      const res = await getSummary(startDate, endDate);
      setSummary(res.data.data);
      setErrorMsg("");
    } catch (error) {
      if (!error.response?.data.metadata.success) {
        setSummary({});
        setErrorMsg(error.response?.data.metadata.message);
      }
    }
  };

  const fetchAccountData = async () => {
    try {
      const res = await getAccount();
      setAccount(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFormattedDate = (inp) => {
    const [day, month, year] = inp.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const eyeClick = (type) => {
    if (type === "balance") setIsBalanceShow((prev) => !prev);
  };

  const handleChangeMonth = (e) => {
    const [year, monthNum] = e.split("-").map(Number);
    const start = new Date(year, monthNum - 1, 1).toLocaleDateString("sv-SE");
    const end = new Date(year, monthNum, 0).toLocaleDateString("sv-SE");

    setMonth(
      new Date(year, monthNum - 1).toLocaleString("default", { month: "long" })
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
    fetchSummary();
  }, [startDate, endDate]);

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <Link
        to={"/add-logs"}
        className="fixed bottom-6 right-6 bg-blue-500 px-3 rounded-full text-3xl text-white pb-1"
      >
        +
      </Link>
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2">
            Financing Overview
          </h1>
          <div className="bg-white flex flex-col rounded-xl py-8 px-5 md:px-12 shadow-sm mt-10">
            <div className="flex justify-end">
              <h2 className="text-[#737373] text-sm">
                {month} Amount Transaction
              </h2>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10 mt-8">
              <div className="w-full border-b-1 md:border-b-0 md:border-r-1 border-gray-200">
                <AccountAmount
                  type={"Balance"}
                  data={formatToIDR(account?.balance)}
                />
              </div>
              <div className="w-full border-b-1 md:border-b-0 md:border-r-1 border-gray-200">
                <AccountAmount
                  type={"Income"}
                  data={formatToIDR(summary.income ?? 0)}
                />
              </div>
              <div className="w-full">
                <AccountAmount
                  type={"Income"}
                  data={formatToIDR(summary.expense ?? 0)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-4 py-12 px-5 md:px-12 bg-white rounded-xl shadow-md">
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

              <Table
                tableHeads={[
                  { name: "Date" },
                  { name: "Category" },
                  { name: "Description" },
                  { name: "Amount" },
                ]}
              >
                {errorMsg == "" &&
                  summary.data?.map((item, key) => {
                    const fc =
                      item.type == "expense"
                        ? "text-red-600"
                        : "text-green-600";
                    const bg = key % 2 == 0 ? "bg-[#F6F6F6]" : "bg-white";
                    return (
                      <Table.Row key={key} classname={bg}>
                        <Table.Cell>
                          <p className="flex gap-x-2 px-2">
                            {getFormattedDate(item.date)}
                            {item.transaction && (
                              <img src={iconlogo} width={15} />
                            )}
                          </p>
                        </Table.Cell>
                        <Table.Cell>{item.category}</Table.Cell>
                        <Table.Cell>{item.notes}</Table.Cell>
                        <Table.Cell classname={fc}>
                          {item.type == "expense" ? "-" : "+"}{" "}
                          {formatToIDR(item.amount)}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table>
              <p className="text-center mt-5 text-[#737373]">{errorMsg}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
