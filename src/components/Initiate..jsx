import React from "react";
import { useState } from "react";


import useIntiateTranction from "../hooks/useInitiateTransaction";

const TransactionTx = () => {
  const handleCreateNewTx = useIntiateTranction();


  const [fields, setFields] = useState({
    amount:"",
    walletAddress: "",
  });

  const handleChange = (name, e) => {
    setFields((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const { amount, walletAddress } = fields;

  const handleSubmit = () => {
    handleCreateNewTx(amount, walletAddress);
    setFields({ amount: "", walletAddress: "", });
}
  return (
    <div className="mt-[300px] overflow-hidden">
      <div className="">
        <h2 className="px-[60px] mb-[40px]"> Initiate Transaction</h2>
        <div className="flex justify-between flex-col md:flex-row">
          <div className="relative">
            {/* <img src={img} width={350} height={350} alt="icon" className=' z-5 brightness-75' ></img> */}
            <div className="absolute top-[40px] md:left-[150px] md:w-[500px]  px-4 md:px-0">
              <h1 className="md:text-6xl  md:w-[500px] leading-[70px] mb-[40px] text-5xl">
                {" "}
                Empowering Secure <br /> Transactions
              </h1>
              <p className="md:w-[400px]">
                {" "}
                At OP&Sons Limited, every transaction counts. Collaborate
                seamlessly with decision-makers to ensure security,
                transparency, and impactful business outcomes. knowledge and
                making a lasting impact on the world.l
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-[100px] mt-[150px] md:mt-0  px-3 md:px-0 lg:px-12 xl:px-24">
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg ">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  Initiate Transaction
                </h2>
                <p className="text-gray-600 mb-6">
                  Kickstart a secure transaction and unite decision-makers to
                  approve with confidence.
                </p>

                <div className="mb-6">
                  <label
                    htmlFor="contribution"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    initiate Transaction
                  </label>

                  <div className="flex flex-col gap-10">
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={amount}
                      onChange={(e) => handleChange("amount", e)}
                    />
                    <input
                      placeholder="Enter Wallet Address"
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={walletAddress}
                      onChange={(e) => handleChange("walletAddress", e)}
                    />
                  </div>

                  <button
                    className="w-full px-4 py-2 bg-[#0077b6] text-white font-semibold rounded-md hover:bg-[#0077b6] focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:ring-offset-2 mt-5"
                    onClick={handleSubmit}
                  >
                    Initiate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTx;
