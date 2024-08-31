import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState, useEffect } from "react";
import defaultpp from "../../assets/defaultpp.png";
import { VariableContext } from "../../context/VariableContext";
import useEditProfile from "../../hooks/useEditProfile";  // Import the custom hook

const UserProfile = () => {
  const { isLoading } = useAuth0();
  const { user } = useContext(VariableContext);
  const { editProfile, message } = useEditProfile();  // Use the custom hook

  const [isEditing, setIsEditing] = useState(false);  // Track edit state
  const [name, setName] = useState(user?.name || "");  // Track name state

  const handleEditProfile = () => {
    setIsEditing(true);  // Enable editing mode
  };

  const handleSaveProfile = () => {
    const updatedData = { name };
    
    editProfile(user?.userid, updatedData);  // Trigger the edit profile action
    setIsEditing(false);  // Disable editing mode
  };

  return (
    <>
      { !isLoading &&
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="min-w-[70px] min-h-[70px] max-w-[70px] rounded-full overflow-hidden">
            <img src={defaultpp} alt="" className="w-full" />
          </div>
          <div>
            <div className="text-white font-[600]">User Id: {user?.userid}</div>
            <div className="text-white font-[600]">
              Name: 
              {isEditing ? (
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="ml-2 p-1 rounded text-black"
                />
              ) : (
                user?.name
              )}
            </div>
            <div className="text-white font-[600] whitespace-nowrap">Email: {user?.email}</div>
            {isEditing ? (
              <button 
                onClick={handleSaveProfile} 
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Save Profile
              </button>
            ) : (
              <button 
                onClick={handleEditProfile} 
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit Profile
              </button>
            )}
            {message && (
              <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
                {message}
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default UserProfile;
