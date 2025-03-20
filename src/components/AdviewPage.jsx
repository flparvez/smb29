"use client";
//   video link = https://res.cloudinary.com/dxmvrhcjx/video/upload/AQN1hTuvsdcLyz8l-T4SyUPKVcE7xjiTUTiiNaMkml-2nScXf9iQwLrO3PcUuLDLXidW0rTIagQyiRVqvk1FZ4ml_sfj3p4.mp4
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const AdViewPage = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ad, setAd] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Fetch ad data by ID
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data } = await axios.get(
          `https://smb29.vercel.app/api/ads/ad?id=${id}`
        );

        if (data.error) {
          setError(data.error);
          return;
        }

        setAd(data.ad);
console.log(ad)
        // 🎯 Simulate loader progress to 100%
        let progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setLoading(false);
              return 100;
            }
            return prev + 5; // Increase by 5% every interval
          });
        }, 100);
      } catch (error) {
        console.error("Failed to fetch ad:", error);
        setError("Failed to load ad.");
      }
    };

    fetchAd();
  }, [id]);

  // ✅ Handle Ad Completion (Balance Update on Button Click)
  const handleAdCompletion = async () => {
    setSubmitting(true); // Show full-page loader on submit
    try {
      const { data } = await axios.get(`https://smb29.vercel.app/api/ads/ad?id=${id}`);
      if (data.error) {
        setError(data.error);
        setSubmitting(false);
        return;
      }

      toast.success("✅ Balance added successfully!");
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Failed to complete ad:", error);
      setError("Failed to complete ad.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 relative">
      {/* ✅ Full-page loader on submit */}
      {submitting && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-2xl font-semibold text-blue-600 animate-spin">
            ⏳ Submitting...
          </div>
        </div>
      )}

      {error ? (
        <h1 className="text-red-500 text-xl font-bold">{error}</h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">🔹 Viewing Ad</h1>

          {loading ? (
            // 🔥 Smooth 100% Loader
            <div className="w-full max-w-md h-4 bg-gray-300 rounded-full relative overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          ) : (
            <>
              {ad && (
                <div className="w-full max-w-md bg-white shadow-md rounded-md p-4 text-center">
                  <h2 className="text-xl font-semibold mb-2">{ad.name}</h2>

                  {/* 🖼️ Ad Image */}
                  <img
                    src="https://i.ibb.co/hR1n9GtC/image.png"
                    alt="Ad banner"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />

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

              {/* ✅ Submit Button */}
              <button
                onClick={handleAdCompletion}
                disabled={submitting}
                className={`mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition ${
                  submitting && "opacity-50 cursor-not-allowed"
                }`}
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
