import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAccount } from "../../api/model/account";
import { getTransaction } from "../../api/model/transaction";
import plus from "../../assets/plus.svg";
import profile from "../../assets/profile.png";
import search from "../../assets/search.svg";
import send from "../../assets/send.svg";
import show from "../../assets/show.svg";
import sun from "../../assets/sun.svg";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import Select from "../../components/Select";
import Table from "../../components/Table";
import { useUserContext } from "../../context/userContext";

const Home = () => {
  const { userInfo } = useUserContext();
  const [account, setAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState({});
  const [limit, setLimit] = useState({ name: "10 Transaction", value: 10 });
  const [sort, setSort] = useState({ name: "Descending", value: "desc" });
  const [sortBy, setSortBy] = useState({ name: "Date", value: "createdAt" });

  const fetchAccountData = async () => {
    try {
      const res = await getAccount();
      setAccount(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await getTransaction(
        page,
        limit.value,
        sort.value,
        sortBy.value
      );
      setTransactions(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      if (!error.response?.data.metadata.success) {
        setTransactions([]);
        setErrorMsg(error.response?.data.metadata.message);
      }
    }
  };

  const getFormattedDate = (inp) => {
    const date = new Date(inp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    fetchAccountData();
    fetchTransactions();
  }, [limit, page, sort, sortBy]);

  const handleShowCount = (e) => {
    setLimit(e.target);
  };

  const handleSort = (e) => {
    setSort(e.target);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-between items-center mt-10">
            <div className="">
              <p className="text-2xl lg:text-5xl font-bold mb-2 ">
                Good Morning, {userInfo?.name}
              </p>
              <p className="text-lg lg:text-2xl mt-2 font-light">
                Check all your incoming and outgoing transactions here
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-end">
                  <p className="font-bold">{userInfo?.name}</p>
                  <p className="">Personal Account</p>
                </div>
                <img
                  src={profile}
                  alt=""
                  className="border-4 h-18 w-auto rounded-full border-[#0061FF]"
                />
              </div>
            </div>
            <img src={sun} className="block md:hidden" alt="" />
          </div>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 mt-20">
            <div className="lg:col-span-3 px-6 py-2 lg:px-9 lg:pt-10 lg:pb-14 bg-[#0061FF] text-white rounded-xl items-center">
              <div className="flex lg:block justify-between items-center">
                <p className="font-light text-xl lg:mb-3">Account No.</p>
                <p className="text-2xl lg:text-3xl">{account?.accountNo}</p>
              </div>
            </div>
            <div className="lg:col-span-9 bg-white rounded-xl px-3 lg:px-9 lg:pt-10 lg:pb-14">
              <div className="flex justify-between items-center lg:items-start">
                <div className="">
                  <p className="text-lg font-light lg:mb-3">Balance</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl md:text-3xl" id="balance">
                      Rp {account?.balance}
                    </p>
                    <img id="showHiddenButton" src={show} alt="" width="30" />
                  </div>
                </div>
                <div className="block lg:flex mt-5 lg:mg-0">
                  <div className="">
                    <Link to="/topup">
                      <img src={plus} className="w-16 md:w-20" alt="plus" />
                    </Link>
                  </div>
                  <div className="">
                    <Link to="/transfer">
                      <img src={send} className="w-16 md:w-20" alt="send" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-16">
            <div className="block lg:flex lg:justify-between">
              <div className="flex gap-x-3 bg-white shadow-input rounded-lg py-3 px-5">
                <img src={search} alt="search icon" className="w-4" />
                <input
                  placeholder="Search"
                  className="focus:outline-none placeholder:text-sm placeholder:font-light text-sm pe-5"
                />
              </div>
              <div className="sm:flex mt-4 lg:mt-0 gap-x-10">
                <div className="flex gap-x-3 items-center">
                  <p className="text-[#737373] font-light">Show</p>
                  <Select
                    placeholder={limit.name}
                    name="type"
                    onChange={handleShowCount}
                    value={limit}
                    option={[
                      { id: 1, name: "10 Transaction", value: 10 },
                      { id: 2, name: "30 Transaction", value: 30 },
                      { id: 3, name: "50 Transaction", value: 50 },
                    ]}
                  />
                </div>
                <div className="flex gap-x-3 items-center mt-3 sm:mt-0">
                  <p className="text-[#737373] font-light">Sort By</p>
                  <Select
                    placeholder={sortBy.name}
                    name="type"
                    onChange={handleSortBy}
                    value={sortBy}
                    option={[
                      { id: 1, name: "Date", value: "createdAt" },
                      { id: 2, name: "Amount", value: "amount" },
                    ]}
                  />
                  <Select
                    placeholder={sort.name}
                    name="type"
                    onChange={handleSort}
                    value={sort}
                    option={[
                      { id: 1, name: "Descending", value: "desc" },
                      { id: 2, name: "Ascending", value: "asc" },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Table
                tableHeads={[
                  { name: "Date & Time" },
                  { name: "Type" },
                  { name: "From/To" },
                  { name: "Description" },
                  { name: "Amount" },
                ]}
              >
                {errorMsg == "" &&
                  transactions?.map((item, key) => {
                    const fc =
                      item.inout == "out" ? "text-red-600" : "text-green-600";
                    const bg = key % 2 == 0 ? "bg-[#F6F6F6]" : "bg-white";
                    return (
                      <Table.Row key={key} classname={bg}>
                        <Table.Cell>
                          {getFormattedDate(item.createdAt)}
                        </Table.Cell>
                        <Table.Cell>{item.type}</Table.Cell>
                        <Table.Cell>{item.fromto}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell classname={fc}>
                          {item.type == "expense" ? "-" : "+"}{" "}
                          {formatToIDR(item.amount)}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table>
              <Pagination
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
                hasNext={pagination.hasNext}
                hasPrevious={pagination.hasPrevious}
                onPageChange={(i) => setPage(i)}
                onNext={() => setPage(page + 1)}
                onPrev={() => setPage(page - 1)}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
