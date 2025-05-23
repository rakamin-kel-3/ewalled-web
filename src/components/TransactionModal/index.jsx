import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import success from "../../assets/success.svg";
import domtoimage from "dom-to-image-more";
import { useRef } from "react";

const TransactionModal = ({ open, setOpen, data }) => {
  const contentRef = useRef(null);

  const handlePrint = () => {
    if (!contentRef.current) return;

    const scale = 2; // For better resolution

    domtoimage
      .toPng(contentRef.current, {
        quality: 1,
        width: contentRef.current.offsetWidth * scale,
        height: contentRef.current.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          backgroundColor: "#ffffff", // Ensure white background
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "transaction-confirmation.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-md data-closed:sm:translate-y-0 data-closed:sm:scale-95 "
          >
            <div ref={contentRef}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-none">
                <div className="border-none">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border-none">
                    <img
                      src={success}
                      alt="success"
                      aria-hidden="true"
                      className="size-12 border-none"
                    />
                  </div>
                  <div className="mt-5 text-center border-none">
                    <DialogTitle
                      as="h2"
                      className="text-2xl font-semibold text-[#2DC071] border-none"
                    >
                      Transfer Success
                    </DialogTitle>
                    <div className="mt-10 border-none">
                      <div className="flex justify-between items-center mb-3 border-none">
                        <p className="text-md font-light border-none">Amount</p>
                        <p className="font-bold text-2xl border-none">
                          {data?.amount}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-3 border-none">
                        <p className="text-md font-light border-none">
                          Transaction ID
                        </p>
                        <p className="text-md font-light border-none">
                          {data?.transactionId}
                        </p>
                      </div>
                      {data?.accountFrom && (
                        <div className="flex justify-between items-center mb-3 border-none">
                          <p className="text-md font-light border-none">From</p>
                          <p className="text-md font-light border-none">
                            {data?.accountFrom}
                          </p>
                        </div>
                      )}
                      {data?.accountTo && (
                        <div className="flex justify-between items-center mb-3 border-none">
                          <p className="text-md font-light border-none">To</p>
                          <p className="text-md font-light border-none">
                            {data?.accountTo}
                          </p>
                        </div>
                      )}
                      {data?.description && (
                        <div className="flex justify-between items-center mb-3 border-none">
                          <p className="text-md font-light border-none">
                            Description
                          </p>
                          <p className="text-md font-light border-none">
                            {data?.description}
                          </p>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-3 border-none">
                        <p className="text-md font-light border-none">
                          Category
                        </p>
                        <p className="text-md font-light border-none">
                          {data?.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white px-4 py-3 my-10 flex gap-x-5 justify-center sm:px-6 print:hidden">
              <button
                type="button"
                onClick={() => handlePrint()}
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
};

export default TransactionModal;
