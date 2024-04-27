import React from 'react'

const ProductSkeletons = () => {
  return (
    <div role="status" class={`flex items-center justify-center  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 md:w-[16%] lg:w-[18%] w-[115px] max-w-[250px] flex-shrink-0 h-[180px] md:h-[240px]`}>
    
    <span class="sr-only">Loading...</span>
</div>

  )
}

export default ProductSkeletons