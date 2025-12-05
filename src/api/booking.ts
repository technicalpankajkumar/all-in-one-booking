import { toast } from "sonner";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const getBookingListing = async () => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/booking`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if (!data.success) {
      toast.error(data.message)
    }
    return data.bookings || [];

  } catch (error) {
    console.error("Error fetching cabs:", error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/booking/${id}/cancel`, {
      method: "PUT",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if (!data.success) {
      toast.error(data.message)
    }else{
        toast.success(data.message)
    }
  } catch (error) {
    console.error("Error fetching cabs:", error);
    throw error;
  }
};