import React, { useState } from "react";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import TransactionModal from "../../components/TransactionModal";

const Transfer = () => {
  const [open, setOpen] = useState(false);

  const handleTransferSelect = () => {
    console.log("transfer select");
  };

  const handleTransfer = () => {
    setOpen(true);
  };

  return (
    <>
      <Navbar />
      <TransactionModal open={open} setOpen={setOpen} />
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 mt-20">
            <div className="hidden md:col-span-2 md:block"></div>
            <div className="md:col-span-8">
              <h1 className="text-xl lg:text-3xl font-bold mb-2">Transfer</h1>
              <div className="p-3 md:p-10 bg-white rounded-3xl">
                <div className="flex pe-10 shadow-input rounded-3xl bg-light">
                  <p className="px-10 py-4 font-bold text-xl bg-[#EDEDED] rounded-3xl">
                    To
                  </p>
                  <select
                    name="transfer"
                    className="text-md font-light w-full ps-10 bg-light focus:outline-none"
                    id="transfer"
                    onChange={handleTransferSelect}
                  >
                    <option value="900782139">900782139 (Giz)</option>
                  </select>
                </div>
                <div className="px-10 pt-5 pb-9 bg-[#FAFBFD] mt-8 rounded-3xl">
                  <p className="font-semibold text-md">Amount</p>
                  <div className="flex border-b-1 pb-3 mt-3">
                    <p className="mr-5 text-3xl">IDR</p>
                    <input
                      type="number"
                      className="bg-light text-3xl focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex mt-3 gap-x-3">
                  <p className="font-light">Balance:</p>
                  <p className="font-semibold text-[#26AA99]">IDR 10.000.000</p>
                </div>
                <div className="w-full mt-8">
                  <Input
                    type="text"
                    name="notes"
                    placeholder="Notes:"
                    rounded="3xl"
                  />
                </div>
                <div className="w-full mt-14">
                  <Button
                    label="Transfer"
                    classname="w-full text-2xl py-4 shadow-xl"
                    onClick={handleTransfer}
                  />
                </div>
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
