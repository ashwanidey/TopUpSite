import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const UserProfile = () => {
  const { user ,isLoading} = useAuth0();
  console.log(user);
  return (
    <>
    { !isLoading &&
    <div className="flex flex-col md:flex-row gap-6 items-center ">
      <div className="min-w-[70px] min-h-[70px] rounded-full overflow-hidden">
        <img src={`${user.picture}`}  alt="" className="object-cover w-full"/>
        
      </div>
      <div>
          <div className="text-white font-[600]">Name : {user.nickname}</div>
          <div className="text-white font-[600] whitespace-nowrap">Email : {user.email}</div>
        </div>
    </div> }
    </>
  );
};

export default UserProfile;
