import React, { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";
import { usePostTransaction } from "../../hooks/wallet/usePostTransaction";

const TopUp = () => {
  const [value, setValue] = useState(null);
  const { user, token } = useContext(VariableContext);

  const { postOrder } = usePostTransaction();

  const handleSubmit = () => {
    const amount = parseInt(value);

    if (amount < 0) {
      alert("Please enter a valid amount");
      return;
    }
    const userid = user?.userid;
    const values = { value, userid };
    postOrder(values, token);
  };
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-4 ">
      <div className="text-yellow-200"> ENTER THE AMOUNT : </div>
      <input type="number" min="0" onChange={(e) => setValue(e.target.value)} />

      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => handleSubmit()}
      >
        TOP UP
      </button>
    </div>
  );
};

export default TopUp;
