import { useState, useContext } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useQueryPoints = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState(null);
  const { host } = useContext(VariableContext);

  const queryPoints = async (token) => {
    setIsLoading(true);
    const response = await fetch(`${host}/admin/querypoints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
      }),
    });
    const data = await response.json();

    if (data.status === 200) {
      setPoints(data.smile_points);
      setMessage("Points fetched successfully");
    } else {
      setMessage("Failed to fetch points");
    }
    setIsLoading(false);
  };

  const queryPointsPh = async (token) => {
    setIsLoading(true);
    const response = await fetch(`${host}/admin/querypoints/ph`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
      }),
    });
    const data = await response.json();

    if (data.status === 200) {
      setPoints(data.smile_points);
      setMessage("Points fetched successfully");
    } else {
      setMessage("Failed to fetch points");
    }
    setIsLoading(false);
  };

  return { isLoading, queryPoints,queryPointsPh, points, message };
};
