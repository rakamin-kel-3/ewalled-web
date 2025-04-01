import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAccount, getListAccount } from "../../api/model/account";
import { transfer } from "../../api/model/transaction";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import SelecLabel from "../../components/SelectLabel";
import TransactionModal from "../../components/TransactionModal";
import useSnackbar from "../../hooks/useSnackbar";

const Transfer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transferResponse, setTransferResponse] = useState({});
  const [account, setAccount] = useState({});

  const snackbar = useSnackbar();

  const onSubmit = async (d) => {
    try {
      const res = await transfer(
        d.receipentAccountNo,
        d.amount,
        d.notes,
        d.category
      );
      setTransferResponse(res.data.data);
      setOpen(true);
      reset();
    } catch (error) {
      snackbar.error(error.response?.data.metadata.message);
    }
  };

  useEffect(() => {
    const fetchAccountList = async () => {
      try {
        const res = await getListAccount();
        setAccounts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAccount = async () => {
      try {
        const res = await getAccount();
        setAccount(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountList();
    fetchAccount();
  }, []);

  return (
    <>
      <Navbar />
      <TransactionModal open={open} setOpen={setOpen} data={transferResponse} />
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 mt-20">
            <div className="hidden md:col-span-2 md:block"></div>
            <div className="md:col-span-8">
              <h1 className="text-xl lg:text-3xl font-bold mb-2">Transfer</h1>
              <div className="p-3 md:p-10 bg-white rounded-3xl">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <SelecLabel
                    label="To"
                    name="receipentAccountNo"
                    options={accounts?.map((item) => ({
                      name: `${item.accountNo} (${item.name})`,
                      value: item.accountNo,
                    }))}
                    labelDefault={"Select receipent account"}
                    {...register("receipentAccountNo", { required: true })}
                  />
                  {errors.receipentAccountNo && (
                    <span className="text-sm text-red-600">
                      Receipent Account wajib diisi
                    </span>
                  )}
                  <div className="px-10 pt-5 pb-9 bg-[#FAFBFD] mt-8 rounded-3xl">
                    <p className="font-semibold text-md">Amount</p>
                    <div className="flex border-b-1 pb-3 mt-3">
                      <p className="mr-5 text-3xl">IDR</p>
                      <input
                        type="number"
                        className="bg-light text-3xl focus:outline-none"
                        {...register("amount", { required: true })}
                      />
                    </div>
                    {errors.amount && (
                      <span className="text-sm text-red-600">
                        Amount wajib diisi
                      </span>
                    )}
                  </div>
                  <div className="flex mt-3 gap-x-3">
                    <p className="font-light">Balance:</p>
                    <p className="font-semibold text-[#26AA99]">
                      IDR {account.balance}
                    </p>
                  </div>
                  <div className="w-full mt-8">
                    <Input
                      type="text"
                      name="notes"
                      placeholder="Notes:"
                      rounded="3xl"
                      {...register("notes", { required: false })}
                    />
                  </div>
                  <SelecLabel
                    label="Category"
                    name="category"
                    options={[
                      { name: "Shopping", value: "shopping" },
                      { name: "Food", value: "food" },
                      { name: "Transport", value: "transport" },
                      { name: "Hobbies", value: "hobbies" },
                      { name: "Etc", value: "etc" },
                    ]}
                    labelDefault={"Select category"}
                    {...register("category", { required: true })}
                  />
                  {errors.category && (
                    <span className="text-sm text-red-600">
                      Category wajib diisi
                    </span>
                  )}
                  <div className="w-full mt-14">
                    <Button
                      label="Transfer"
                      classname="w-full text-2xl py-4 shadow-xl"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden md:col-span-2  md:block"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
