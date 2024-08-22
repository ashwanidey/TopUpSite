import React, { useContext, useEffect, useState } from "react";
import { useGetUsers } from "../../../hooks/admin/useGetUsers";
import UsersTableRow from "./UsersTableRow";
import { VariableContext } from "../../../context/VariableContext";
import Spinner from "../../../components/Spinner";

const UsersData = () => {
  const { isLoading1, users, getUsers } = useGetUsers();
  const { token } = useContext(VariableContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterVerified, setFilterVerified] = useState('All');

  useEffect(() => {
    async function fetch() {
      await getUsers(token);
    }
    fetch();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterRoleChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleFilterVerifiedChange = (event) => {
    setFilterVerified(event.target.value);
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.mobilenumber?.toLowerCase().includes(searchQuery.toLowerCase()) || user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || user?.role === filterRole;
    const matchesVerified = filterVerified === 'All' || (filterVerified === 'true' && user?.verified === "true") || (filterVerified === 'false' && user?.verified === "false");

    return matchesSearch && matchesRole && matchesVerified;
  });

  return (
    <>
      {!isLoading1 ? (
        <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          {/* Search and Filter Section */}
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="Search by Mobile Number or Email"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
              />

              <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
                <select
                  value={filterRole}
                  onChange={handleFilterRoleChange}
                  className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto"
                >
                  <option value="All">Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="reseller">Reseller</option>
                </select>

                <select
                  value={filterVerified}
                  onChange={handleFilterVerifiedChange}
                  className="p-2 mt-4 sm:mt-0 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto"
                >
                  <option value="All">Verification</option>
                  <option value="true">Verified</option>
                  <option value="false">Unverified</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-5 py-3">Customer ID</th>
                  <th scope="col" className="px-5 py-3">Name</th>
                  <th scope="col" className="px-5 py-3">Mobile No.</th>
                  <th scope="col" className="px-5 py-3">Email</th>
                  <th scope="col" className="px-5 py-3">Role</th>
                  <th scope="col" className="px-5 py-3">Verified</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((data) => (
                  <UsersTableRow key={data?.userid} user={data} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="justify-center items-center mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default UsersData;
