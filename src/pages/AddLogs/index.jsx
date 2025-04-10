import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createMoneyLogs } from "../../api/model/money-logs";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import SelecLabel from "../../components/SelectLabel";
import useSnackbar from "../../hooks/useSnackbar";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";

const optionsIncome = [
  { name: "Salary", value: "salary" },
  { name: "Bonus", value: "bonus" },
];

const optionsExpense = [
  { name: "Shopping", value: "shopping" },
  { name: "Food", value: "food" },
  { name: "Transport", value: "transport" },
  { name: "Hobbies", value: "hobbies" },
  { name: "Study", value: "study" },
  { name: "Etc", value: "etc" },
];

const AddLogs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [options, setOptions] = useState([]);

  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (d) => {
    try {
      const res = await createMoneyLogs(
        d.amount,
        d.type,
        d.date,
        d.category,
        d.notes
      );
      snackbar.success(res.data.metadata.message);
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      snackbar.error(error.response?.data.metadata.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 mt-20">
            <aside className="hidden md:col-span-2 md:block"></aside>

            <section className="md:col-span-8">
              <div>
                <SectionTitle title="Add Money Log" />
                
              </div>

              <Container>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <SelecLabel
                    label="Type"
                    name="type"
                    labelDefault={"Select type"}
                    labelBgColor={"bg-[#0061FF]"}
                    labelColor={"text-white"}
                    options={[
                      { name: "Expense", value: "expense" },
                      { name: "Income", value: "income" },
                    ]}
                    {...register("type", {
                      required: true,
                      onChange: (e) => {
                        const val = e.target.value;
                        if (val == "expense") {
                          setOptions(optionsExpense);
                          return;
                        }
                        setOptions(optionsIncome);
                      },
                    })}
                  />
                  {errors.type && (
                    <span className="text-sm text-red-600">
                      Type wajib diisi
                    </span>
                  )}

                  <div className="px-10 pt-5 pb-9 bg-[#FAFBFD] rounded-3xl mt-8">
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

                  <div className="flex pe-10 shadow-input rounded-3xl bg-light mt-8">
                    <p className="px-10 py-4 font-bold text-xl bg-[#EDEDED] rounded-3xl">
                      Date
                    </p>
                    <input
                      name="date"
                      type="date"
                      className="text-md font-light w-full ps-10 bg-light focus:outline-none"
                      id="date"
                      {...register("date", { required: true })}
                    />
                  </div>
                  {errors.date && (
                    <span className="text-sm text-red-600">
                      Date wajib diisi
                    </span>
                  )}

                  <div className="mt-8">
                    <SelecLabel
                      label="Category"
                      name="category"
                      labelDefault={"Select Category"}
                      options={options}
                      {...register("category", { required: true })}
                    />
                    {errors.category && (
                      <span className="text-sm text-red-600">
                        Category wajib diisi
                      </span>
                    )}
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

                  <div className="w-full mt-14">
                    <Button
                      label="Save"
                      classname="w-full text-2xl py-4 shadow-xl"
                    />
                  </div>
                </form>
              </Container>
            </section>

            <aside className="hidden md:col-span-2 md:block"></aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddLogs;
