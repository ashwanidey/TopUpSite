import React from "react";

const UsersTableRow = ({user}) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user?.userid}<br></br>
        {user?._id}
      </th>
      <td class="px-6 py-4">{user?.name}<br></br> {user?.mobilenumber}<br></br>{user?.email}</td>
      {/* <td class="px-6 py-4">{user?.mobilenumber}</td>
      <td class="px-6 py-4">{user?.email}</td> */}
    </tr>
  );
};

export default UsersTableRow;
