import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [games, setGames] = useState([]);
  const [trending, setTrending] = useState([]);
  const [ott, setOtt] = useState([]);
  const {host} = useContext(VariableContext);

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const gamesResponse = await fetch(`${host}/product/games`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${token}`,
        },
      });
     

      setGames(await gamesResponse.json());

      const ottResponse = await fetch(`${host}/product/ott`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${token}`,
        },
      });

      setOtt(await ottResponse.json());

      const trendingResponse = await fetch(
        `${host}/product/trending`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //  Authorization: `Bearer ${token}`,
          },
        }
      );

      setTrending(await trendingResponse.json());

      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return {games,ott,trending,isLoading,getProducts}
};



