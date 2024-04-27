import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [games, setGames] = useState([]);
  const [trending, setTrending] = useState([]);
  const [ott, setOtt] = useState([]);
  const { host } = useContext(VariableContext);

  const [products,seProducts] = useState([]);

  const getAllProducts = async(token)=>{
    setIsLoading(true);
    const response = await fetch(`${host}/product/allproducts`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
    })

    seProducts(await response.json());
    setIsLoading(false);

  }

  const getProducts = async () => {
    setIsLoading(true);

    try {
      // Perform multiple API calls in parallel using Promise.all()
      const [gamesResponse, ottResponse, trendingResponse] = await Promise.all([
        fetch(`${host}/product/games`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${host}/product/ott`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${host}/product/trending`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // Process responses concurrently
      const gamesData = await gamesResponse.json();
      const ottData = await ottResponse.json();
      const trendingData = await trendingResponse.json();

      // Update state once all responses are available
      setGames(gamesData);
      setOtt(ottData);
      setTrending(trendingData);

      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return { games, ott, trending, isLoading, getProducts,getAllProducts,products };
};




