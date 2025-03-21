// cronJobs/resetDailyLimits.js
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import cron from "node-cron"; // npm install node-cron

// Define the task that resets the daily limits for users
const resetAllUserLimits = async () => {
  await connectToDb();
  await User.resetAllDailyLimits();
  console.log("✅ Daily ad limits reset for all users!");
};

// Schedule the job to run every midnight
cron.schedule("0 0 * * *", async () => {
  await resetAllUserLimits();
});

console.log("✅ Cron job for resetting daily limits is running...");
