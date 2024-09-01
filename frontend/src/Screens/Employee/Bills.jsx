import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";

const Bills = () => {
  const [utility, setUtility] = useState();
  const [category, setCategory] = useState();
  const [userData, setUserData] = useState();
  const [selected, setSelected] = useState({
    category: "",
    enrollmentYear: "",
    utility: "",
    examType: "internal",
  });
  const [noDataMessage, setNoDataMessage] = useState("");

  const loadUserDetails = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/user/details/getDetails`,
        { category: selected.category, enrollmentYear: selected.enrollmentYear },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          if (response.data.user.length === 0) {
            setNoDataMessage("No search results found. Search with necessary and right entries.");
            setUserData([]);
          } else {
            setUserData(response.data.user);
            setNoDataMessage(""); // Clear message if data is found
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitBillsHandler = () => {
    let container = document.getElementById("billContainer");
    container.childNodes.forEach((enroll) => {
      setUserBillsHandler(
        enroll.id,
        document.getElementById(enroll.id + "bills").value
      );
    });
  };

  const setUserBillsHandler = (enrollment, value) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/bills/addBills`,
        {
          enrollmentNo: enrollment,
          [selected.examType]: {
            [selected.utility]: value,
          },
        },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.dismiss();
          toast.success(response.data.message);
        } else {
          toast.dismiss();
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

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
        toast.error(error.message);
      });
  };

  const getUtilityData = () => {
    toast.loading("Loading Utilities");
    axios
      .get(`${baseApiURL()}/utility/getUtility`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setUtility(response.data.utility);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getCategoryData();
    getUtilityData();
  }, []);

  const resetValueHandler = () => {
    setUserData();
    setNoDataMessage(""); // Clear message when resetting
  };

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Upload User's Utilities Bills`} />
        {userData && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
            onClick={resetValueHandler}
          >
            <span className="mr-2">
              <BiArrowBack className="text-red-500" />
            </span>
            Close
          </button>
        )}
      </div>
      {!userData && (
        <>
          <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="category" className="leading-7 text-base ">
                Category
              </label>
              <select
                id="category"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.category}
                onChange={(e) =>
                  setSelected({ ...selected, category: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {category &&
                  category.map((category) => {
                    return (
                      <option value={category.name} key={category.name}>
                        {category.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
  <label htmlFor="enrollmentYear" className="leading-7 text-base">
    Enrollment Year
  </label>
  <input
    type="number"
    id="enrollmentYear"
    className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
    placeholder="Enter Enrollment Year"
    value={selected.enrollmentYear}
    onChange={(e) =>
      setSelected({ ...selected, enrollmentYear: e.target.value })
    }
  />
</div>

            <div className="w-full">
              <label htmlFor="utility" className="leading-7 text-base ">
                Select Utility
              </label>
              <select
                id="utility"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.utility}
                onChange={(e) =>
                  setSelected({ ...selected, utility: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {utility &&
                  utility.map((utility) => {
                    return (
                      <option value={utility.name} key={utility.name}>
                        {utility.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <button
            className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
            onClick={loadUserDetails}
          >
            Load Users Data
          </button>
        </>
      )}
      {userData && userData.length !== 0 && noDataMessage === "" && (
        <>
          <h2 className="mt-4 text-1.5xl font-bold text-green-600">
            Search Result for {selected.category} Category enrolled in year {" "}
            {selected.enrollmentYear}. Add bills for {selected.utility} Utility.
          </h2>
          <div
            className="w-full flex flex-wrap justify-center items-center mt-8 gap-4"
            id="billContainer"
          >
            {userData.map((user) => {
  const fullName = `${user.firstName} ${user.middleName ? user.middleName + " " : ""}${user.lastName}`;

  return (
    <div
      key={user.enrollmentNo}
      className="w-[30%] flex flex-col border-2 border-blue-500 rounded-lg p-4 space-y-2"
      id={user.enrollmentNo}
    >
      <div className="flex flex-col space-y-1">
        <p className="text-lg font-semibold text-blue-800">
        Name: {fullName}
        </p>
        <p className="text-md text-black-600">
          User Id: {user.enrollmentNo}
        </p>
      </div>
      <input
        type="number"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="Enter Bill Amount"
        id={`${user.enrollmentNo}bills`}
      />
    </div>
  );
})}

          </div>
          <button
            className="bg-blue-500 px-6 py-3 mt-8 mx-auto rounded text-white"
            onClick={submitBillsHandler}
          >
            Upload Utility Bill
          </button>
        </>
      )}
      {noDataMessage && (
         <h2 className="mt-4 text-1.5xl font-bold text-red-600">{noDataMessage}</h2>
      )}
    </div>
  );
};

export default Bills;
