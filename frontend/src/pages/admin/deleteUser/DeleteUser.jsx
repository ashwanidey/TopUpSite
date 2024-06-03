import React, { useContext, useEffect, useState } from 'react'
import { useDeleteUser } from '../../../hooks/admin/useDeleteUser';
import { VariableContext } from '../../../context/VariableContext';

const DeleteUser = () => {
  const [email,setEmail] = useState(null);
  const {deleteUser,respone} = useDeleteUser();
  const {token} = useContext(VariableContext);

  const handleSubmit = async() => {
    await deleteUser(token,email);
  }

  
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
      <label className='text-white'>ENTER EMAIL</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      {respone ? <p className='text-[#E72929] mt-[-13px] text-[0.9rem] '>{respone}</p> : <></>}
      <button onClick={() => handleSubmit()} className='bg-white'> Submit</button>
    </div>
  )
}

export default DeleteUser