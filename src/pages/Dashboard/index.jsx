import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { useState } from "react";
import seedrandom from "seedrandom";
import Select from "../../components/Select";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const tableHeads = [
    { name: "Date & Time" },
    { name: "Type" },
    { name: "Category" },
    { name: "Description" },
    { name: "Amount" },
  ];

  const generateDummyData = (seed = "my-seed") => {
    const rng = seedrandom(seed); // Create a seeded RNG
    const types = ["Income", "Expense"];
    const Categories = [
      "Food and Drink",
      "Transportation",
      "Wages",
      "Life and Entertainment",
    ];
    const names = ["John", "Spongebob", "Anwar", "Sendy", "Joko", "Bank BCA"];
    const descriptions = [
      "Lunch",
      "Coffee",
      "Shopping",
      "Topup via VA",
      "Subscription",
      "Transfer",
    ];

    return Array.from({ length: 20 }, (_, i) => {
      const type = types[Math.floor(rng() * types.length)];
      const isIn = type === "Income";
      return {
        createdAt: new Date(2025, 2, 30, 14, i).toISOString(),
        type,
        fromto: Categories[Math.floor(rng() * Categories.length)],
        description: descriptions[Math.floor(rng() * descriptions.length)],
        amount: Math.floor(rng() * 1000000) + 50000,
        inout: isIn ? "in" : "out",
      };
    });
  };

  const dummyData = generateDummyData("1");

  const totals = dummyData.reduce(
    (acc, item) => {
      if (item.inout === "in") {
        acc.in += item.amount;
      } else {
        acc.out += item.amount;
      }
      return acc;
    },
    { in: 0, out: 0 }
  );

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const [isBalanceShow, setIsBalanceShow] = useState(false);
  const [isIncomeShow, setIsIncomeShow] = useState(false);
  const [isExpenseShow, setIsExpenseShow] = useState(false);
  const Icons = {
    balance: isBalanceShow ? EyeIcon : EyeSlashIcon,
    income: isIncomeShow ? EyeIcon : EyeSlashIcon,
    expense: isExpenseShow ? EyeIcon : EyeSlashIcon,
  };

  const eyeClick = (type) => {
    if (type === "balance") setIsBalanceShow((prev) => !prev);
    if (type === "income") setIsIncomeShow((prev) => !prev);
    if (type === "expense") setIsExpenseShow((prev) => !prev);
  };

  const [sortBy, setSortBy] = useState("createdAt");

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const [count, setCount] = useState(10);
  const handleShowCount = (e) => {
    setCount(e.target.value);
  };

  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState({});

  return (
    <>
      <Navbar />
      <div className="bg-[#FAFBFD] min-h-screen flex flex-col space-y-5 px-40">
        <h1 className="text-3xl font-bold mt-20">Financing Overview</h1>
        <div className="bg-white flex flex-col rounded-xl py-8 px-12 shadow-md">
          <div className="flex justify-end">
            <h2 className="text-gray-500 text-sm">
              Amount Transaction This Month
            </h2>
          </div>

          <div className="flex flex-row space-x-10 mt-8">
            <div className="flex flex-col space-y-1 w-1/3 border-r-2 border-gray-200">
              <p className="text-gray-500">Balance</p>
              <div className="flex flex-row items-center">
                <p className="text-3xl m-0">
                  {isBalanceShow
                    ? formatToIDR(totals.in + totals.out)
                    : "*****"}
                </p>
                <Icons.balance
                  className="h-6 text-gray-500 ml-3 hover:text-black"
                  onClick={() => eyeClick("balance")}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1 w-1/3 border-r-2 border-gray-200">
              <p className="text-gray-500">Income</p>
              <div className="flex flex-row items-center">
                <p className="text-3xl m-0">
                  {isIncomeShow ? formatToIDR(totals.in) : "*****"}
                </p>
                <Icons.income
                  className="h-6 text-gray-500 ml-3 hover:text-black"
                  onClick={() => eyeClick("income")}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1 w-1/3">
              <p className="text-gray-500">Expense</p>
              <div className="flex flex-row items-center">
                <p className="text-3xl m-0">
                  {isExpenseShow ? formatToIDR(totals.out) : "*****"}
                </p>
                <Icons.expense
                  className="h-6 text-gray-500 ml-3 hover:text-black"
                  onClick={() => eyeClick("expense")}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-4 px-18 py-12 bg-white rounded-xl shadow-md">
            <div className="flex flex-row justify-between mb-8">
              <div className="flex flex-row items-center space-x-3">
                <p>Show</p>
                <Select
                  placeholder="Last 10 Transaction"
                  name="type"
                  onChange={handleShowCount}
                  option={[
                    { id: 1, name: "Last 10 Transaction", value: 10 },
                    { id: 2, name: "Last 30 Transaction", value: 30 },
                    { id: 3, name: "Last 50 Transaction", value: 50 },
                  ]}
                />
              </div>
              <div className="flex flex-row items-center space-x-3">
                <p>Month</p>
                <Select
                  placeholder="Januari 2025"
                  name="type"
                  onChange={handleShowCount}
                  option={[
                    { id: 1, name: "Januari 2025", value: 10 },
                    { id: 2, name: "Februari 2025", value: 30 },
                    { id: 3, name: "Maret 2025", value: 50 },
                  ]}
                />
              </div>
            </div>

            <Table data={dummyData} tableHeads={tableHeads} />

            <Pagination
              totalPages={5}
              currentPage={0}
              hasNext={true}
              hasPrevious={false}
              onPageChange={(i) => setPage(i)}
              onNext={() => setPage(page + 1)}
              onPrev={() => setPage(page - 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
