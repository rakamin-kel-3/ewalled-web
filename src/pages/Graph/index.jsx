import Navbar from "../../components/Navbar";
import seedrandom from "seedrandom";
import Table from "../../components/Table";

const Graph = () => {
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
        category: Categories[Math.floor(rng() * Categories.length)],
        description: descriptions[Math.floor(rng() * descriptions.length)],
        amount: Math.floor(rng() * 1000000) + 50000,
        inout: isIn ? "in" : "out",
      };
    });
  };
  const dummyData = generateDummyData("2");

  const groupByCategory = (data, type) => {
    const filtered = data.filter((d) => d.inout === type);
    const grouped = {};

    // Group data by category
    filtered.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = 0;
      grouped[item.category] += item.amount;
    });

    const total = Object.values(grouped).reduce((sum, val) => sum + val, 0);

    // Map to array with percentage
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / total) * 100), // rounded to 2 decimal places
    }));
  };

  const incomeData = groupByCategory(dummyData, "in");
  const expenseData = groupByCategory(dummyData, "out");

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#FAFBFD] min-h-screen flex flex-col space-y-5 px-40 pt-10">
        <div className="flex flex-row justify-between">
          <p>Financial Diary</p>
          <p>Ini Sorter</p>
        </div>
        <div className="flex items-center flex-col space-y-4 shadow-xl rounded-xl bg-white p-5">
          <p>January</p>
          <div className="flex w-full space-x-5">
            <div className="flex w-1/2 items-center border-2">
              <button className="h-20 bg-white items-center">Halo aja</button>
            </div>
            <div className="flex w-1/2 items-center border-2">
              <button className="h-20 bg-white items-center">Halo aja 2</button>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-5">
          <div className="bg-white w-1/2 rounded-xl shadow-md px-8 py-4">
            <div className="flex flex-col items-center mb-5">
              <p className="text-xl font-semibold">Income</p>
            </div>
            <ul>
              {incomeData.map((item, index) => (
                <div>
                  <hr className="my-2 border-gray-300" />
                  <li key={index}>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row space-x-2 items-center">
                        <button className="bg-blue-500 font-semibold text-white rounded-md py-1 px-2">
                          {item.percentage}%
                        </button>
                        <div>{item.name}</div>
                      </div>
                      <div>{formatToIDR(item.value)}</div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <hr className="my-2 border-gray-300" />
          </div>
          <div className="bg-white w-1/2 rounded-xl shadow-md px-8 py-4">
            <div className="flex flex-col items-center mb-5">
              <p className="text-xl font-semibold">Expenses</p>
            </div>
            <ul>
              {expenseData.map((item, index) => (
                <div>
                  <hr className="my-2 border-gray-300" />
                  <li key={index}>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row space-x-2 items-center">
                        <button className="bg-blue-500 font-semibold text-white rounded-md py-1 px-2">
                          {item.percentage}%
                        </button>
                        <div>{item.name}</div>
                      </div>
                      <div>{formatToIDR(item.value)}</div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <hr className="my-2 border-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
