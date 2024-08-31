import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";

const useEditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { host, setUser } = useContext(VariableContext);

  const editProfile = async (userId, updatedData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/user/edit-profile`, {
        method: "POST",  // Changed to PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userId,  // Pass userid here
          ...updatedData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);  // Update user data in context
        setMessage("Profile updated successfully, please relogin.");
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (error) {
      setMessage("An error occurred while updating the profile");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, editProfile, message };
};

export default useEditProfile;
