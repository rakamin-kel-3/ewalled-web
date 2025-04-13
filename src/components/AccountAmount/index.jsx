import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AccountAmount = ({ type, data }) => {
  const [isBalanceShow, setIsBalanceShow] = useState(false);

  const Icons = {
    balance: isBalanceShow ? EyeIcon : EyeSlashIcon,
  };

  const eyeClick = () => {
    setIsBalanceShow((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col pb-5 pe-5 md:pb-0 space-y-1 w-full">
        <p className="text-[#737373]">{type}</p>
        <div className="flex flex-row items-center">
          <p className="text-2xl m-0">{isBalanceShow ? data : "*****"}</p>
          <Icons.balance
            className="h-6 text-[#737373] ml-3 hover:text-black"
            onClick={() => eyeClick()}
          />
        </div>
      </div>
    </>
  );
};

export default AccountAmount;
