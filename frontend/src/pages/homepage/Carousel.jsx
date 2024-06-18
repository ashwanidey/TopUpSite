import React, { useEffect } from "react";
import "flowbite";
// import picture from "../../assets/poster.jpg";
import { initFlowbite } from "flowbite";
import banner1 from "../../assets/banner1.jpg"
import banner2 from "../../assets/banner2.jpg"
import banner3 from "../../assets/banner3.jpg"

const Carousel = () => {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <>
      <div id="default-carousel" class="relative z-10 " data-carousel="slide">
        <div class="relative h-40 overflow-hidden rounded-[1em] md:h-80 ">
          <div
            class="hidden duration-700 ease-in-out rounded-[1em] h-full "
            data-carousel-item
          >
            <img
              src={banner2}
              class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full object-cover hidden md:block"
              alt="..."
            />
            <img
              src="/bannermb1.jpg"
              class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full object-cover md:hidden block"
              alt="..."
            />
          </div>

          <div class="hidden duration-700 ease-in-out w-full h-full" data-carousel-item>
    <img src={banner1} class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full object-cover hidden md:block" alt="..." />
    <img
              src="/bannermb2.jpg"
              class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full object-cover md:hidden block"
              alt="..."
            />
</div>


          <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={banner3}
              class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full object-cover hidden md:block"
              alt="..."
            />
             <img
              src="/bannermb3.jpg"
              class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full object-cover md:hidden block"
              alt="..."
            />
          </div>

        </div>

        <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            class="w-5  h-3 rounded-full "
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            class="w-5 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            class="w-5 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
        
        </div>

        {/* <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="sr-only">Next</span>
            </span>
        </button> */}
      </div>
    </>
  );
};

export default Carousel;
