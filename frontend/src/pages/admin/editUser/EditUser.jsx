import React, { useContext, useState } from 'react';
import { useEditUserRole } from '../../../hooks/admin/useEditUserRole';
import { VariableContext } from '../../../context/VariableContext';

const EditUserRole = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const { editUserRole, response, isLoading } = useEditUserRole();
  const { token } = useContext(VariableContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editUserRole(token, email, role);
  };

  return (
    <div className="mt-12 lg:mx-12 mx-4 flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <label className='text-gray-800 font-semibold'>Enter Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className='text-gray-800 font-semibold'>Enter Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        {response && <p className='text-red-600 mt-[-13px] text-[0.9rem]'>{response}</p>}
        <button
          type="submit"
          className='bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none'
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default EditUserRole;
