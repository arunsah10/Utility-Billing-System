import React, { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";
const User = () => {
  const [search, setSearch] = useState();
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    enrollmentYear: "",
    category: "",
    gender: "",
    profile: "",
  });
  const [id, setId] = useState();

  const searchUserHandler = (e) => {
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      enrollmentYear: "",
      category: "",
      gender: "",
      profile: "",
    });
    e.preventDefault();
    toast.loading("Getting User");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/user/details/getDetails`,
        { enrollmentNo: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.dismiss();
            toast.error("No User Found!");
          } else {
            toast.success(response.data.message);
            setData({
              enrollmentNo: response.data.user[0].enrollmentNo,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              enrollmentYear: response.data.user[0].enrollmentYear,
              category: response.data.user[0].category,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
            });
            setId(response.data.user[0]._id);
          }
        } else {
          toast.dismiss();
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="User Details" />
      </div>
      <div className="my-6 mx-auto w-full">
        <form
          className="flex justify-center items-center border-2 border-blue-500 rounded w-[40%] mx-auto"
          onSubmit={searchUserHandler}
        >
          <input
            type="text"
            className="px-6 py-3 w-full outline-none"
            placeholder="User Id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 text-2xl hover:text-blue-500" type="submit">
            <FiSearch />
          </button>
        </form>
        {id && (
          <div className="mx-auto w-full bg-blue-50 mt-10 flex justify-between items-center p-10 rounded-md shadow-md">
            <div>
              <p className="text-2xl font-semibold">
                {data.firstName} {data.middleName} {data.lastName}
              </p>
              <div className="mt-3">
                <p className="text-lg font-normal mb-2">
                  User Id: {data.enrollmentNo}
                </p>
                <p className="text-lg font-normal mb-2">
                  Phone Number: +91 {data.phoneNumber}
                </p>
                <p className="text-lg font-normal mb-2">
                  Email Address: {data.email}
                </p>
                <p className="text-lg font-normal mb-2">
                  Category: {data.category}
                </p>
                <p className="text-lg font-normal mb-2">
                  Enrollment Year: {data.enrollmentYear}
                </p>
              </div>
            </div>
            <img
              src={process.env.REACT_APP_MEDIA_LINK + "/" + data.profile}
              alt="user profile"
              className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
