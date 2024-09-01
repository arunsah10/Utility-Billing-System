import React, { useState } from "react";
import Heading from "../../components/Heading";
import AddUser from "./User/AddUser";
import EditUser from "./User/EditUser";
const User = () => {
  const [selected, setSelected] = useState("add");
  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="User Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" ? "border-b-3 border-blue-600 text-blue-600" : "text-gray-700"
            } border-blue-500 px-6 py-3 text-base font-semibold rounded-lg bg-white hover:bg-blue-50 transition-all duration-300`}
            onClick={() => setSelected("add")}
          >
            Add User
          </button>
          <button
  className={`${
    selected === "edit" ? "border-b-3 border-blue-600 text-blue-600" : "text-gray-700"
  } border-blue-500 px-6 py-3 text-base font-semibold rounded-lg bg-white hover:bg-blue-50 transition-all duration-300`}
  onClick={() => setSelected("edit")}
>
  Edit User
</button>

        </div>
      </div>
      {selected === "add" && <AddUser />}
      {selected === "edit" && <EditUser />}
    </div>
  );
};

export default User;
