import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { topup } from "../../api/model/transaction";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import SelecLabel from "../../components/SelectLabel";
import TransactionModal from "../../components/TransactionModal";
import useSnackbar from "../../hooks/useSnackbar";

const Topup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [open, setOpen] = useState(false);
  const [topupTransfer, setTopupResponse] = useState({});

  const snackbar = useSnackbar();

  const onSubmit = async (d) => {
    try {
      const res = await topup(d.paymentMethod, d.amount, d.notes);
      setTopupResponse(res.data.data);
      setOpen(true);
      reset();
    } catch (error) {
      snackbar.error(error.response?.data.metadata.message);
    }
  };

  return (
    <>
      <Navbar />
      <TransactionModal open={open} setOpen={setOpen} data={topupTransfer} />
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 mt-20">
            <div className="hidden md:col-span-2 md:block"></div>
            <div className="md:col-span-8">
              <h1 className="text-xl lg:text-3xl font-bold mb-2">Top up</h1>
              <div className="p-3 md:p-10 bg-white rounded-3xl">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="px-10 pt-5 pb-9 bg-[#FAFBFD] rounded-3xl">
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
                  <SelecLabel
                    label="From"
                    name="paymentMethod"
                    options={[
                      { name: "Credit Card", value: "cc" },
                      { name: "Byond PAY", value: "byondpay" },
                    ]}
                    labelDefault={"Select payment method"}
                    {...register("paymentMethod", { required: true })}
                  />
                  {errors.paymentMethod && (
                    <span className="text-sm text-red-600">
                      payment method wajib diisi
                    </span>
                  )}
                  <div className="w-full mt-8">
                    <Input
                      type="text"
                      name="notes"
                      placeholder="Notes:"
                      rounded="3xl"
                      {...register("notes", { required: false })}
                    />
                  </div>
                  <div className="w-full mt-14">
                    <Button
                      label="Topup"
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

export default Topup;
