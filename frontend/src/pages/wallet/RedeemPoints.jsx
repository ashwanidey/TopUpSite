import React from 'react'
import { VariableContext } from '../../context/VariableContext';
import { usePostPoints } from '../../hooks/points/usePostPoints';

const RedeemPoints = () => {
  const [value, setValue] = React.useState(null);
  const { user, token } = React.useContext(VariableContext);

  const { postPoints, message } = usePostPoints();

  const handleSubmit = () => {
    const userid = user?.userid;
   
    const values = { value, userid };
    postPoints(values, token)
  }

  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-4 ">
    <div className="text-yellow-200"> ENTER THE AMOUNT : </div>
    <input type="number" min="0" onChange={(e) => setValue(e.target.value)} />
    {message && <div className="text-red-500">{message}</div>}
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={() => handleSubmit()}
    >
     REDEEM
    </button>
  </div>
  )
}

export default RedeemPoints