import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";
const Category = () => {
  const [data, setData] = useState({
    name: "",
  });
  const [selected, setSelected] = useState("add");
  const [category, setCategory] = useState();
  useEffect(() => {
    getCategoryHandler();
  }, []);

  const getCategoryHandler = () => {
    axios
      .get(`${baseApiURL()}/category/getCategory`)
      .then((response) => {
        if (response.data.success) {
          setCategory(response.data.categories);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const addCategoryHandler = () => {
    toast.loading("Adding Category");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/category/addCategory`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ name: "", code: "" });
          getCategoryHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteCategoryHandler = (id) => {
    const alert = prompt("Are You Sure? Type CONFIRM to continue");
    if (alert === "CONFIRM") {
      toast.loading("Deleting Category");
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .delete(`${baseApiURL()}/category/deleteCategory/${id}`, {
          headers: headers,
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            getCategoryHandler();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Categories Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${
              selected === "add" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Category
          </button>
          <button
            className={`${
              selected === "view" && "border-b-2 "
            }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("view")}
          >
            View Category
          </button>
        </div>
      </div>
      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="w-[40%]">
            <label htmlFor="name" className="leading-7 text-sm ">
              Category Name
            </label>
            <input
              type="name"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            className="mt-6 bg-blue-500 px-6 py-3 text-white"
            onClick={addCategoryHandler}
          >
            Add Category
          </button>
        </div>
      )}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <ul>
            {category &&
              category.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
                  >
                    <div>{item.name}</div>
                    <button
                      className="text-2xl hover:text-red-500"
                      onClick={() => deleteCategoryHandler(item._id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Category;
