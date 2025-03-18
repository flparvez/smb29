"use client"
import axios from 'axios';
import React from 'react';

interface Package {
  title: string;
  price: number;
  dailyAds: number;
  dailyIncome: number;
  validity: number;
}
const Packages = () => {
  const packages = [
    {
      title: "Basic",
      price: 500,
      dailyAds: 3,
      dailyIncome: 300,
      validity: 130,
    },
    {
      title: "Standard",
      price: 1000,
      dailyAds: 5,
      dailyIncome: 500,
      validity: 130,
    },
    {
      title: "Premium",
      price: 1500,
      dailyAds: 7,
      dailyIncome: 700,
      validity: 130,
    },
    {
      title: "Platinum",
      price: 2000,
      dailyAds: 10,
      dailyIncome: 1000,
      validity: 210,
    },
    {
      title: "Gold",
      price: 5000,
      dailyAds: 30,
      dailyIncome: 3000,
      validity: 290,
    },
    {
      title: "Diamond",
      price: 10000,
      dailyAds: 60,
      dailyIncome: 6000,
      validity: 330,
    },
  ];

 // Handle Buy Now button click
 const handleBuyNow = async (plan:Package) => {
    try {
     
      const response = await axios.post('/api/save-plan', {
        title: plan.title,
        price: plan.price,
        dailyAds: plan.dailyAds,
        dailyIncome: plan.dailyIncome,
        validity: plan.validity,
        
      });

      if (response.status === 200) {
        alert('Plan purchased successfully!');
      }
    } catch (error) {
      console.error('Error purchasing plan:', error);
      alert('Failed to purchase the plan!');
    }
  }
  return (
    <div className="grid grid-cols-2 gap-5 p-5">
      {packages.map((item, index) => (
        <div key={index} className="p-5 relative bg-white w-full overflow-hidden border border-gray-300 rounded-lg">
          <div className="bg-white">
            <h2 className="text-xl text-center font-bold whitespace-nowrap">{item.title}</h2>
            <p className="w-7 text-black h-7 bg-none flex justify-center items-center rounded-full absolute top-0 right-0">3x</p>
            <h2 className="text-lg text-center font-bold whitespace-nowrap">{item.price}</h2>
            <hr className="my-2" />
            <div className="text-sm text-gray-700">
              <p className="flex gap-2 items-center">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <polygon fill="#8BC34A" points="24,3 28.7,6.6 34.5,5.8 36.7,11.3 42.2,13.5 41.4,19.3 45,24 41.4,28.7 42.2,34.5 36.7,36.7 34.5,42.2 28.7,41.4 24,45 19.3,41.4 13.5,42.2 11.3,36.7 5.8,34.5 6.6,28.7 3,24 6.6,19.3 5.8,13.5 11.3,11.3 13.5,5.8 19.3,6.6"></polygon>
                  <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"></polygon>
                </svg> Daily {item.dailyAds} Ads
              </p>
              <p className="flex gap-2 items-center">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <polygon fill="#8BC34A" points="24,3 28.7,6.6 34.5,5.8 36.7,11.3 42.2,13.5 41.4,19.3 45,24 41.4,28.7 42.2,34.5 36.7,36.7 34.5,42.2 28.7,41.4 24,45 19.3,41.4 13.5,42.2 11.3,36.7 5.8,34.5 6.6,28.7 3,24 6.6,19.3 5.8,13.5 11.3,11.3 13.5,5.8 19.3,6.6"></polygon>
                  <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"></polygon>
                </svg> Daily Income {item.dailyIncome} Taka
              </p>
              <p className="flex gap-2 items-center">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <polygon fill="#8BC34A" points="24,3 28.7,6.6 34.5,5.8 36.7,11.3 42.2,13.5 41.4,19.3 45,24 41.4,28.7 42.2,34.5 36.7,36.7 34.5,42.2 28.7,41.4 24,45 19.3,41.4 13.5,42.2 11.3,36.7 5.8,34.5 6.6,28.7 3,24 6.6,19.3 5.8,13.5 11.3,11.3 13.5,5.8 19.3,6.6"></polygon>
                  <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"></polygon>
                </svg> Validity {item.validity} days
              </p>
            </div>
            <button
              className="buyBtn align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full bg-[#0f9b0f] text-white mt-4 border shadow-none rounded-lg"
              onClick={() => handleBuyNow(item)} // Pass the plan data to handleBuyNow
            >
              Buy now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Packages;
