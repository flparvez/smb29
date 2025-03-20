import axios from 'axios';

/**
 * Fetches user data by user ID
 * @param {string} userId - The ID of the user to fetch data for
 * @returns {Promise<object>} - The user data object
 * @throws {Error} - Throws an error if the fetch fails
 */
const getUserData = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const { data } = await axios.get(`/api/auth/user?id=${userId}`);
    return data;
  } catch (err) {
    console.error("Failed to fetch user data:", err);
    throw new Error("Failed to load user data");
  }
};

export default getUserData;
