import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";

const AddEmployee = () => {
  const [file, setFile] = useState();
  const [category, setCategory] = useState();
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    gender: "",
    experience: "",
    post: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const getCategoryData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/category/getCategory`, { headers })
      .then((response) => {
        if (response.data.success) {
          setCategory(response.data.categories);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const addEmployeeProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Employee");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("employeeId", data.employeeId);
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("department", data.department);
    formData.append("experience", data.experience);
    formData.append("gender", data.gender);
    formData.append("post", data.post);
    formData.append("type", "profile");
    formData.append("profile", file);
    axios
      .post(`${baseApiURL()}/employee/details/addDetails`, formData, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(`${baseApiURL()}/employee/auth/register`, {
              loginid: data.employeeId,
              password: data.employeeId,
            })
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setPreviewImage();
                setData({
                  employeeId: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  department: "",
                  gender: "",
                  experience: "",
                  post: "",
                });
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <form
      onSubmit={addEmployeeProfile}
      className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
    >
      <div className="w-[40%]">
        <label htmlFor="firstname" className="leading-7 text-sm ">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="middlename" className="leading-7 text-sm ">
          Middle Name
        </label>
        <input
          type="text"
          id="middlename"
          value={data.middleName}
          onChange={(e) => setData({ ...data, middleName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="lastname" className="leading-7 text-sm ">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="employeeId" className="leading-7 text-sm ">
         Employee Id
        </label>
        <input
          type="number"
          id="employeeId"
          value={data.employeeId}
          onChange={(e) => setData({ ...data, employeeId: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="email" className="leading-7 text-sm ">
           Email Address
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="phoneNumber" className="leading-7 text-sm ">
          Phone Number
        </label>
        <input
          type="number"
          id="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="category" className="leading-7 text-sm ">
          Category
        </label>
        <select
          id="category"
          className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
          value={data.department}
          onChange={(e) => setData({ ...data, department: e.target.value })}
        >
          <option defaultValue>-- Select --</option>
          {category?.map((category) => {
            return (
              <option value={category.name} key={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="post" className="leading-7 text-sm ">
          Enter POST
        </label>
        <input
          type="text"
          id="post"
          value={data.post}
          onChange={(e) => setData({ ...data, post: e.target.value })}
          className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="w-[95%] flex justify-evenly items-center">
        <div className="w-[25%]">
          <label htmlFor="gender" className="leading-7 text-sm ">
            Gender
          </label>
          <select
            id="gender"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          >
            <option defaultValue>-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-[25%]">
          <label htmlFor="experience" className="leading-7 text-sm ">
            Experience of Working
          </label>
          <input
            type="number"
            id="experience"
            value={data.experience}
            onChange={(e) => setData({ ...data, experience: e.target.value })}
            className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-[25%]">
          <label htmlFor="file" className="leading-7 text-sm ">
            Profile Pic
          </label>
          <label
            htmlFor="file"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
          >
            Upload
            <span className="ml-2">
              <FiUpload />
            </span>
          </label>
          <input
            hidden
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      {previewImage && (
        <div className="w-full flex justify-center items-center">
          <img src={previewImage} alt="user" className="h-36" />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 px-6 py-3 rounded-sm my-6 text-white"
      >
        Add New Employee
      </button>
    </form>
  );
};

export default AddEmployee;
