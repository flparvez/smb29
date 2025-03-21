"use client"
import { useFetchData } from '@/lib/useFetchData';
import Image from 'next/image';
import React from 'react'
import toast from 'react-hot-toast';

const PaymentNumber = ({selectedAmount}) => {
    const { data, loading, error, refetch } = useFetchData("/api/setting", { revalidate: true });

    if (loading) return <p>Loading settings...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    // Function to copy text to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success('Copied to clipboard!', text);
      },
      (err) => {
        alert('Failed to copy text: ' + err);
      }
    );
  };
  return (
    <div className=" m-5 p-4 bg-white rounded-lg py-5 shadow whitespace-nowrap">

        <div className="flex gap-1 items-center">
            <Image src="/nagad.png" width={100} height={100} alt="" className="-ml-[2px] h-7 w-7" />
          
            <h2 className=" text-lg ">Nagad: </h2>
            <h3 className="text-lg" id="p2">0{data?.paymentMethods?.nagad}</h3>
             <div>
             <button type='button'
            className="bg-[#15A710] rounded-lg cursor-pointer px-3 text-white text-sm"
            onClick={() => handleCopy(`0${data?.paymentMethods?.nagad}`)}
          >
            Copy
          </button>
                </div>
        </div>

    <div className="flex gap-1 mt-2 items-center">
            <Image src="/bkash.png" width={100} height={100} alt="" className="-ml-[2px] h-7 w-7" />
          
            <h2 className=" text-lg ">Bkash: </h2>
            <h3 className="text-lg" id="p2">0{data?.paymentMethods?.bkash}</h3>
             <div>
             <button type='button'
            className="bg-[#15A710] rounded-lg cursor-pointer px-3 text-white text-sm"
            onClick={() => handleCopy(`0${data?.paymentMethods?.bkash}`)}
          >
            Copy
          </button>
                
                </div>
        </div>



        <div className="flex items-center gap-1 mt-5">
  <Image width={100} height={100}  src="/amount.jpg" alt="" className="-ml-[2px] h-7 w-7" />

            <h2 className="text-xl " id="p1">Amount: {selectedAmount} Taka</h2>
            
            <button type='button'
            className="bg-[#15A710] rounded-lg cursor-pointer px-3 text-white text-sm"
            onClick={() => handleCopy(selectedAmount)}
          >
            Copy
          </button>
        </div>
    </div>

  )
}

export default PaymentNumber
