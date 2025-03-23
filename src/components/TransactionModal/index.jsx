import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import success from "../../assets/success.svg";

export default function TransactionModal({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-md data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full">
                  <img
                    src={success}
                    alt="success"
                    aria-hidden="true"
                    className="size-12"
                  />
                </div>
                <div className="mt-5 text-center">
                  <DialogTitle
                    as="h2"
                    className="text-2xl font-semibold text-[#2DC071]"
                  >
                    Transfer Success
                  </DialogTitle>
                  <div className="mt-10">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-md font-light">Amount</p>
                      <p className="font-bold text-2xl">1.000.000</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-md font-light">Transaction ID</p>
                      <p className="text-md font-light">3217837473824</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-md font-light">From</p>
                      <p className="text-md font-light">01010101010</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-md font-light">To</p>
                      <p className="text-md font-light">10110101010</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-md font-light">Description</p>
                      <p className="text-md font-light">
                        Bayar Iphone 100 Pro Max
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white px-4 py-3 my-10 flex gap-x-5 justify-center sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#23A6F0] ring-1 shadow-xs ring-[#23A6F0] ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Print
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#23A6F0] ring-1 shadow-xs ring-[#23A6F0] ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
