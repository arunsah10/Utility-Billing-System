import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";

const Bills = () => {
  const userData = useSelector((state) => state.userData);
  const [internal, setInternal] = useState();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/bills/getBills`,
        { enrollmentNo: userData.enrollmentNo },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.length !== 0) {
          setInternal(response.data.Bill[0].internal);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
      });
  }, [userData.enrollmentNo]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title={`Estimated Bills`} />
      <div className="mt-14 w-full flex gap-20">
      {internal && (
  <div className="w-1/2 shadow-md p-4 bg-white rounded-lg">
    <p className="border-b-2 border-red-500 text-2xl font-semibold pb-2 text-gray-800">
      Utility Calculations
    </p>
    <div className="mt-5">
      {/* Column headings */}
      <div className="flex justify-between items-center w-full text-lg font-semibold bg-gray-100 p-2 rounded-t-md">
        <p className="w-1/4 text-blue-600">Utility</p>
        <p className="w-1/4 text-blue-600">Charge</p>
        <p className="w-1/4 text-blue-600">GST Amount</p>
        <p className="w-1/4 text-blue-600">Tax Amount</p>
      </div>

      {Object.keys(internal).map((item, index) => {
        const charge = parseFloat(internal[item]) || 0;
        const gst = charge * 0.1; // GST is 10% of Charge
        const tax = charge * 0.13; // Tax is 13% of Charge

        return (
          <div
            key={index}
            className="flex justify-between items-center w-full text-lg mt-2 border-b-2 border-gray-200 p-2"
          >
            <p className="w-1/4">{item}</p>
            <span className="w-1/4">{charge.toFixed(2)}</span>
            <span className="w-1/4">{gst.toFixed(2)}</span>
            <span className="w-1/4">{tax.toFixed(2)}</span>
          </div>
        );
      })}

      {/* Calculate and display the total sum */}
      <div className="flex justify-between items-center w-full text-lg mt-5 font-semibold bg-gray-200 p-2 rounded-b-md">
        <p className="w-1/4 text-red-700">Total</p>
        <span className="w-1/4 text-red-700">
          {Object.values(internal)
            .reduce((acc, value) => acc + parseFloat(value) || 0, 0)
            .toFixed(2)}
        </span>
        <span className="w-1/4 text-red-700">
          {Object.values(internal)
            .reduce((acc, value) => acc + (parseFloat(value) || 0) * 0.1, 0)
            .toFixed(2)}
        </span>
        <span className="w-1/4 text-red-700">
          {Object.values(internal)
            .reduce((acc, value) => acc + (parseFloat(value) || 0) * 0.13, 0)
            .toFixed(2)}
        </span>
      </div>

      {/* Sum Total as a single number */}
      <div className="flex justify-between items-center w-full text-lg mt-5 font-semibold">
        <p className="w-full text-green-600">Sum Total</p>
        <span className="w-full text-green-600">
          {(Object.values(internal).reduce((acc, value) => acc + parseFloat(value) || 0, 0) +
            Object.values(internal).reduce((acc, value) => acc + (parseFloat(value) || 0) * 0.1, 0) +
            Object.values(internal).reduce((acc, value) => acc + (parseFloat(value) || 0) * 0.13, 0)).toFixed(2)}
        </span>
        <button
    className="bg-green-600 text-white px-10 py-2 ml-4 rounded-lg hover:bg-green-700 transition duration-200"
    onClick={() => {
      const totalAmount = (
        Object.values(internal).reduce((acc, value) => acc + parseFloat(value) || 0, 0) +
        Object.values(internal).reduce((acc, value) => acc + (parseFloat(value) || 0) * 0.1, 0) +
        Object.values(internal).reduce((acc, value) => acc + (parseFloat(value) || 0) * 0.13, 0)
      ).toFixed(2);
      alert(`Payment processing of Utility Bills of Rs ${totalAmount}`);
    }}
  >
    Pay
  </button>

      </div>
      
    </div>
  </div>
)}

        
          {!internal &&  <p>No Current Bills available At The Moment!</p>}
      </div>
    </div>
  );
};

export default Bills;
