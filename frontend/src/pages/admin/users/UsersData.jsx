import React, { useContext, useEffect } from "react";
import { useGetUsers } from "../../../hooks/admin/useGetUsers";
import UsersTableRow from "./UsersTableRow";
import { VariableContext } from "../../../context/VariableContext";
import Spinner from "../../../components/Spinner";

const UsersData = () => {
  const { isLoading1, users, getUsers } = useGetUsers();
  const { token} = useContext(VariableContext);

  useEffect(() => {
    async function fetch() {
      // const token = await getAccessTokenSilently();
      await getUsers(token);
    }
    fetch();
  }, []);
  return (
    <>
      {!isLoading1 ? (
        <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          <div class=" overflow-x-auto shadow-md sm:rounded-lg ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Mobile No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {users?.map((data) => {
                  return <UsersTableRow user={data} />;
                })}
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
