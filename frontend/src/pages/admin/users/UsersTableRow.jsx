import React from "react";

const UsersTableRow = ({user}) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user?.userid}
        {/* {user?._id} */}
      </th>
      <td class="px-6 py-4">{user?.name}</td>
      <td class="px-6 py-4">{user?.mobilenumber}</td>
      <td class="px-6 py-4">{user?.email}</td>
      <td class="px-6 py-4">{user?.role}</td>
      <td class="px-6 py-4">{user?.verified}</td>
    </tr>
  );
};

export default UsersTableRow;
