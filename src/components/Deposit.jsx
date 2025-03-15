"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DepositPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(500);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  

  const router = useRouter()
    const handleSubmit = (e) => {
      e.preventDefault();
      // Save selected amount and payment method to localStorage
  localStorage.setItem('selectedAmount', selectedAmount);
  localStorage.setItem('selectedMethod', JSON.stringify(selectedMethod)); // Store as string
router.push('/user/deposit/manual');
    
    };


    const [selectedMethod, setSelectedMethod] = useState(null);

    const handleSelectMethod = (method) => {
      setSelectedMethod(method);
    };
  
    const paymentMethods = [
      {
        id: 12,
        name: 'Bkash',
        image: 'https://tshop29.com/assets/images/gateway/66571c564ca4a1716984918.png',
        alias: 'bkash',
      },
      {
        id: 13,
        name: 'Nagad',
        image: 'https://tshop29.com/assets/images/gateway/66571c9fbfa491716984991.png',
        alias: 'nagad',
      },
      {
        id: 14,
        name: 'Rocket',
        image: 'https://tshop29.com/assets/images/gateway/66571cd0149f91716985040.jpeg',
        alias: 'rocket',
      },
    ];
  return (
    
      
    <div className="min-h-screen bg-[#ebebeb] pb-10">
    <Link href="/user/dashboard" className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 font-bold cursor-pointer w-7"
      >
        <path
          fillRule="evenodd"
          d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h2 className="text-xl font-bold">Deposit</h2>
    </Link>
    <div className="flex justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
      নোটিশ: মিনিমাম ডিপোজিট ৫০০ টাকা।
    </div>
    <div className="flex gap-3 items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
      <h2 className="text-xl">Balance:</h2>
      <h2 className="text-[#0c0ce8] text-xl font-bold">100 Taka</h2>
    </div>



    <form onSubmit={handleSubmit} className="space-y-4">

    <div className="flex flex-col items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
            <h2 className="mb-3  text-xl ">Amount</h2>
            <div className="flex w-full max-w-lg items-center border justify-center border-gray-300 rounded-lg overflow-hidden">
                <div className="h-12 w-12 flex items-center justify-center border-r border-gray-300"><svg stroke="currentColor"
                        fill="currentColor" strokeWidth="0" viewBox="0 0 640 512"
                        className="h-8 cursor-pointer w-6 text-gray-900" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M320 144c-53.02 0-96 50.14-96 112 0 61.85 42.98 112 96 112 53 0 96-50.13 96-112 0-61.86-42.98-112-96-112zm40 168c0 4.42-3.58 8-8 8h-64c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h16v-55.44l-.47.31a7.992 7.992 0 0 1-11.09-2.22l-8.88-13.31a7.992 7.992 0 0 1 2.22-11.09l15.33-10.22a23.99 23.99 0 0 1 13.31-4.03H328c4.42 0 8 3.58 8 8v88h16c4.42 0 8 3.58 8 8v16zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zm-16 272c-35.35 0-64 28.65-64 64H112c0-35.35-28.65-64-64-64V176c35.35 0 64-28.65 64-64h416c0 35.35 28.65 64 64 64v160z">
                        </path>
                    </svg></div>
                <div className="relative w-full min-w-[200px] h-11">
                  
                  <input placeholder="Enter Amount" id="amount" value={selectedAmount} required name="amount" onChange={(e) => setSelectedAmount(e.target.value)}
                 type="number"
                        className="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline  focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200 focus:border-green-500 !border-gray-300 focus:border-none border-none bg-white text-gray-900  placeholder:text-gray-500  "
                         /><label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-green-500 before:border-blue-gray-200 peer-focus:before:!border-green-500 after:border-blue-gray-200 peer-focus:after:!border-green-500 hidden">Mobile
                        Number </label></div>
            </div>

       
            <div>
      <p className="text-red-500 text-sm text-left w-full mt-1">Minimum deposit 500 BDT</p>
      <div className="mt-5 flex justify-center gap-3 flex-wrap">
        {[500, 1000, 2000, 3000, 5000, 9000, 15000, 18000, 25000].map((amount) => (
          <div
            key={amount}
            onClick={() => handleSelectAmount(amount)}
            className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none border border-blue-500 text-blue-700 py-1.5 px-3 text-xs rounded-lg cursor-pointer ${
              selectedAmount === amount ? 'bg-blue-500 text-white' : 'border-blue-500'
            }`}
            style={{ opacity: 1 }}
          >
            <span>{amount}</span>
          </div>
        ))}
      </div>
   
    </div>

        </div>
        <div className="flex flex-col items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
      <h2 className="mb-3 text-lg">Select Payment Method</h2>
      <div className="flex gap-5">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleSelectMethod(method)}
            className={`deposit p-3 relative rounded-lg cursor-pointer border-4 ${
              selectedMethod?.id === method.id ? 'border-blue-500' : 'border-gray-300'
            }`}
            data-id={method.id}
            data-resource={JSON.stringify(method)}
          >
            <img src={method.image} alt={method.name} className="h-8 w-8 mx-auto" />
            <h2 className="text-[#0c0ce8] text-sm font-bold">{method.name}</h2>
          </div>
        ))}
      </div>
      {selectedMethod && (
        <p className="mt-3 text-green-500">You selected {selectedMethod.name}</p>
      )}
    </div>
    <div className="m-5"><button type="submit"
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full hover:bg-[#0c0ce8] mt-6 bg-[#0c0ce8] shadow-none flex gap-3 justify-center items-center rounded-full">Next</button>
        </div>
      </form>
  </div>
  )
}

export default DepositPage
