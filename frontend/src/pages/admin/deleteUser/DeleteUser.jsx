import React, { useContext, useState } from 'react';
import { useDeleteUser } from '../../../hooks/admin/useDeleteUser';
import { VariableContext } from '../../../context/VariableContext';

const DeleteUser = () => {
  const [email, setEmail] = useState(null);
  const { deleteUser, respone } = useDeleteUser();
  const { token } = useContext(VariableContext);

  const handleSubmit = async () => {
    await deleteUser(token, email);
  };

  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
      <label className="text-white">ENTER EMAIL</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-200 border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
      />
      {respone ? (
        <p className="text-[#E72929] mt-[-13px] text-[0.9rem]">{respone}</p>
      ) : (
        <></>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  );
};

export default DeleteUser;
