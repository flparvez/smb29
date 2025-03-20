"use client";

import Link from "next/link";
import React from "react";

const HelplinePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    
      <Link  className="text-[#7baa1b] text-2xl font-bold mb-4" href="/user/dashboard">Go Dashboard</Link>
      <h1 className="text-[#7baa1b] text-3xl font-bold mb-4">📞 Helpline</h1>
      <h2 className="text-[#7baa1b] text-xl font-semibold mb-6">
        Need Assistance? Contact Us!
      </h2>

      {/* Call Button */}
      <a
        href="tel:01944778154"
        className="bg-[#7baa1b] text-white text-lg font-bold px-6 py-3 rounded-md shadow-md hover:bg-[#6a8e14] transition"
      >
        📲 Call Now: 01944778154
      </a>

      {/* Support Info */}
      <p className="mt-4 text-gray-600 text-sm">
        Available 24/7 for your support. Feel free to call us anytime!
      </p>

      {/* Optional: Email Section */}
      <div className="mt-6 text-center">
        <h3 className="text-[#7baa1b] text-lg font-semibold">📧 Email Support:</h3>
        <a
          href="mailto:support@example.com"
          className="text-blue-500 underline hover:text-blue-700"
        >
          support@example.com
        </a>
      </div>
    </div>
  );
};

export default HelplinePage;
