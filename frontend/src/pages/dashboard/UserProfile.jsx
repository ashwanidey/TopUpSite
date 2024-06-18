import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import defaultpp from "../../assets/defaultpp.png"
import { VariableContext } from "../../context/VariableContext";

const UserProfile = () => {
  const {isLoading} = useAuth0();
  const {user} = useContext(VariableContext)
  
  return (
    <>
    { !isLoading &&
    <div className="flex flex-col md:flex-row gap-6 items-center ">
      <div className="min-w-[70px] min-h-[70px]  max-w-[70px] rounded-full overflow-hidden">
        <img src={defaultpp}  alt="" className="w-full"/>
        
      </div>
      <div>
      <div className="text-white font-[600]">User Id : {user?.userid}</div>
          <div className="text-white font-[600]">Name : {user?.name}</div>
          <div className="text-white font-[600] whitespace-nowrap">Email : {user?.email}</div>
        </div>
    </div> }
    </>
  );
};

export default UserProfile;
