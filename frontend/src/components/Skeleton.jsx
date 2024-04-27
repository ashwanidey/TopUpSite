import React from 'react'

const Skeleton = ({height}) => {
  return (
    

<div role="status" class={`flex items-center justify-center h-[${height}] max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700`}>
    
    <span class="sr-only">Loading...</span>
</div>

  )
}

export default Skeleton