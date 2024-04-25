import { useState } from "react";

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [games, setGames] = useState([]);
  const [trending, setTrending] = useState([]);
  const [ott, setOtt] = useState([]);

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const gamesResponse = await fetch(`http://localhost:3001/product/games`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${token}`,
        },
      });
     

      setGames(await gamesResponse.json());

      const ottResponse = await fetch(`http://localhost:3001/product/ott`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${token}`,
        },
      });

      setOtt(await ottResponse.json());

      const trendingResponse = await fetch(
        `http://localhost:3001/product/trending`,
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



// import { useEffect, useState } from "react";

// export const useGet = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const [data, setData] = useState([]);


//   const getData = async (path) => {
//     // console.log(path, "path");
//     setIsLoading(true);

//     const response = await fetch(`http://localhost:3001${path}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         //  Authorization: `Bearer ${token}`,
//       },
//     });

//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//     }
//     if (response.ok) {
      
//       setData(json);
//     }
//   };

//   return { getData, data, isLoading, error };
// };