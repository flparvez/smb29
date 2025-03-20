"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const AdViewPage = ({ id }) => {
  const [ad, setAd] = useState(null);
  const [error, setError] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [buttonProgress, setButtonProgress] = useState(0);
  const router = useRouter();

  // ✅ Fetch Ad Data on Load
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data } = await axios.get(`https://smb29.vercel.app/api/ads/ad?id=${id}`);

        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        setAd(data.ad);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch ad:", error);
        setError("Failed to load ad.");
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  // ✅ Handle Video End Event
  const handleVideoEnd = () => {
    setVideoEnded(true);
    toast.success("🎉 Video completed! You can now submit.");
  };

  // ✅ Handle Ad Completion (Submit Button with Loader)
  const handleAdCompletion = async () => {
    setSubmitting(true);

    // 🎯 Smooth Button Loader Animation
    const loaderInterval = setInterval(() => {
      setButtonProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loaderInterval);
          return 100;
        }
        return prev + 5; // Increases by 5% every step
      });
    }, 100);

    try {
      const { data } = await axios.post(`https://smb29.vercel.app/api/ads/ad?id=${id}`);

      if (data.error) {
        setError(data.error);
        setSubmitting(false);
        return;
      }

      toast.success("✅ Ad viewed successfully! Balance added.");
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Failed to complete ad:", error);
      setError("Failed to complete ad.");
    } finally {
      clearInterval(loaderInterval);
      setSubmitting(false);
      setButtonProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {loading ? (
        <h1 className="text-2xl font-bold text-blue-600">🔄 Loading Ad...</h1>
      ) : error ? (
        <h1 className="text-red-500 text-xl font-bold">{error}</h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-blue-700">🔹 Viewing Ad</h1>

          {ad && (
            <div className="w-full max-w-md bg-white shadow-md rounded-md p-4 text-center">
              <h2 className="text-xl font-semibold mb-2">{ad.name}</h2>

              {/* 🎥 Ad Video */}
              <video
                src=" https://res.cloudinary.com/dxmvrhcjx/video/upload/AQN1hTuvsdcLyz8l-T4SyUPKVcE7xjiTUTiiNaMkml-2nScXf9iQwLrO3PcUuLDLXidW0rTIagQyiRVqvk1FZ4ml_sfj3p4.mp4"
                controls={true}
                autoPlay={true}
                onEnded={handleVideoEnd}
                className="w-full h-48 object-cover rounded-md mb-2"
              />

              <a
                href={ad.ads_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                🔗 Visit Ad Link
              </a>
            </div>
          )}

          {/* ✅ Submit Button (Only appears after video ends) */}
          {videoEnded && (
            <button
              onClick={handleAdCompletion}
              disabled={submitting}
              className="mt-6 relative bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition overflow-hidden"
            >
              {submitting ? (
                <>
                  <span className="relative text-black z-10">⏳ Submitting...</span>
                  <div
                    className="absolute text-black top-0 left-0 h-full bg-blue-400 transition-all ease-in-out"
                    style={{ width: `${buttonProgress}%` }}
                  />
                </>
              ) : (
                "✅ Submit"
              )}
            </button>
          )}

          {/* 🔥 Full Page Loading Overlay (for submitting) */}
          {submitting && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="text-white text-xl font-bold">
                ⏳ Processing your reward...
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdViewPage;
