import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useRegister = () => {
  const { host } = useContext(VariableContext);
  const [isEmailUnique,setIsEmailUnique] = useState("true");

  const register = async (name, mobilenumber, email, password) => {
    try {
      if(name === "" || mobilenumber === "" || email === "" || password === "") return 
      const existingEmail = await fetch(`${host}/verify/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      const existingEmailData = await existingEmail.json();

      if (!existingEmailData.isUnique) {
        // Formik.setFieldError('username', 'Username must be unique');
        setIsEmailUnique(existingEmailData.isUnique);
        return;
      }
      setIsEmailUnique(existingEmailData.isUnique);

      const response = await fetch(`${host}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          mobilenumber: mobilenumber,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.msg === "Invalid credentials. ") {
        return;
      }

      window.location = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return { register,isEmailUnique };
};
