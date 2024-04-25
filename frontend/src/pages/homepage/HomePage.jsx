import React from "react";
import CardsScroller from "../../components/card/CardsScroller";
import Carousel from "./Carousel";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"

const HomePage = () => {

  const {getAccessTokenSilently} = useAuth0();

  // const callUnProtected = async() =>{
  //   const response = await fetch(`http://localhost:3001/show`,{
  //     method:"GET"
  //   })
  // }

  // const callProtected = async() =>{
  //   try{
  //   const token = await getAccessTokenSilently();
  //   console.log(token);
    
  //   // const response = await fetch(`http://localhost:3001/protected`,{
  //   //   method:"GET",
  //   //   headers: { Authorization: `Bearer ${token}` },
  //   // })

  //   const response = await axios.get('http://localhost:3001/protected',{
  //     headers : {
  //       authorization : `Bearer ${token}`,
  //     }
  //   })
  // }catch(err){
  //   console.log(err.message);
  // }
  // }
  return (
    <>
      <div className="mt-[5rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-5">
      
        <Carousel/>
       {/* <button onClick={callUnProtected}>Protected</button>
       <button onClick={callProtected}>Not Protected</button> */}
       <div className="font-[800] text-white text-[2rem]">GAMES</div>
        <CardsScroller />
        <div className="font-[800] text-white text-[2rem]">OTT</div>
        <CardsScroller />
        
        
      </div>
    </>
  );
};

export default HomePage;
