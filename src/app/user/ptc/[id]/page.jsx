"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const AdViewPage = ({ params: { id} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ad, setAd] = useState(null);
  const router = useRouter();


  // Fetch ad data when the page loads
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data } = await axios.get(`/api/ads/view/${id}`);
        if (data.ads && data.ads.length > 0) {
          const foundAd = data
          if (foundAd) {
            setAd(foundAd);
          } else {
            setError("Ad not found!");
          }
        }
      } catch (err) {
        setError("Failed to load ad.");
      } finally {
        // Show loader for 5 seconds before revealing the button
        setTimeout(() => setLoading(false), 5000);
      }
    };

    fetchAd();
  }, [adId]);

  // Handle Ad "Submit" (complete ad viewing)
  const handleAdCompletion = () => {
    alert("✅ Ad viewed successfully!");
    router.push("/ads");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {error ? (
        <h1 className="text-red-500 text-xl font-bold">{error}</h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">🔹 Viewing Ad</h1>

          {loading ? (
            <div className="w-full max-w-md h-4 bg-gray-300 rounded-full relative overflow-hidden">
              <div className="h-full bg-blue-500 animate-pulse" style={{ width: "100%" }}></div>
            </div>
          ) : (
            <>
              {ad && (
                <div className="w-full max-w-md bg-white shadow-md rounded-md p-4 text-center">
                  <h2 className="text-xl font-semibold mb-2">{ad.name}</h2>
       

                  <a
                    href={ad.ads_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Visit Ad Link
                  </a>
                </div>
              )}

              <button
                onClick={handleAdCompletion}
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                ✅ Submit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdViewPage;
