import React from 'react'

const Input = ({data}) => {
  return (
    <div class="relative ">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <span className="font-[500] text-white">{data.label}</span>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-[7rem] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Please Enter ${data.label}`}
          />
        </div>
  )
}

export default Input