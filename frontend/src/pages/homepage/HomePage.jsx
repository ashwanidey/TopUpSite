import React, { useEffect, useState } from "react";
import CardsScroller from "../../components/card/CardsScroller";
import Carousel from "./Carousel";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import CardsGrid from "../../components/card/CardsGrid";
import { useGetProducts } from "../../hooks/useGetProducts";
import ProductSkeletons from "../../components/skeletons/ProductSkeletons";
import whatsappIcon from "../../assets/icons8-whatsapp-48.png";
import adImage from "../../assets/ad-image.png"; // Add your ad image here
import closeIcon from "../../assets/close-icon.png"; // Add your close icon here

const HomePage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isPopupVisible, setIsPopupVisible] = useState(true); // State to control popup visibility
  const iterations = Array.from({ length: 30 }, (_, index) => index);

  const { getProducts, isLoading, games, trending, ott } = useGetProducts();
  useEffect(() => {
    async function fetch() {
      await getProducts();
    }
    fetch();
  }, []);

  const callProtected = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.get("http://localhost:3001/admin/processing", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false); // Close the popup
  };

  return (
    <>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-[300px]">
            <img
              src={adImage}
              alt="Ad"
              className="w-full h-auto rounded-lg object-cover"
              style={{ borderRadius: '0.5rem' }}
            />
            <button
              onClick={handlePopupClose}
              className="absolute top-2 right-2"
            >
              <img src={closeIcon} alt="Close" className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      )}


      <a
        href="https://wa.me/919883084820"
        className="fixed bottom-[20px] right-[20px] z-50 flex items-center gap-2 bg-green-500 p-2 rounded-full text-white"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8" />
        Contact us
      </a>
      <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
        <Carousel />
        <div className="mt-5 flex flex-col gap-4">
          {!isLoading ? (
            <>
              <div>
                <div className="font-[800] text-white md:text-[2rem] text-[1.5rem]">
                  Trending
                </div>
                <CardsScroller data={trending} />
              </div>

              <section id="games">
                <div className="font-[800] text-white md:text-[2rem] text-[1.5rem]">
                  Games
                </div>
                <CardsGrid data={games} />
              </section>

              {/* <section id="ott">
                <div className="font-[800] text-white md:text-[2rem] text-[1.5rem]">
                  OTT
                </div>
                <CardsGrid data={ott} />
              </section> */}
            </>
          ) : (
            <div className="flex flex-col w-full gap-4 overflow-auto">
              <div className="font-[800] text-white md:text-[2rem] text-[1.5rem]">
                Trending
              </div>
              <div className="flex gap-5">
                {iterations.map((it) => {
                  return <ProductSkeletons key={it} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;