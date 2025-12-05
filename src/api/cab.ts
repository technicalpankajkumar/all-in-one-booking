import { toast } from "sonner";
const API_URL = import.meta.env.VITE_APP_API_URL;
export const addCab = async (cabData, images) => {
  try {
    const formData = new FormData();

    // "data" must ALWAYS be a string if you send JSON object
    formData.append("data", JSON.stringify(cabData));

    // Multiple images
    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append("images", file); // fieldname matches backend: 'images'
      });
    }
     const token = localStorage.getItem("token"); 
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/cab/create`, {
      method: "POST",
      headers: {
        "Authorization": token, // ⬅ same as backend expects
      },
      body: formData, // VERY IMPORTANT: no headers, browser sets boundary
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error creating cab:", err);
    throw err;
  }
};

export const getCabsListing = async () => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/cab`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if(!data.success){
        toast.error(data.message)
    }
    return data.cars || [];

  } catch (error) {
    console.error("Error fetching cabs:", error);
    throw error;
  }
};

export const getCabById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/cab/${id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if(!data.success){
        toast.error(data.message)
    }
    return data.car || [];

  } catch (error) {
    console.error("Error fetching cabs:", error);
    throw error;
  }
};


export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/booking/create`, {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    if(!data.success){
        toast.error(data.message)
    }
    console.log(data,'booking data')
    return data;
  } catch (error) {
    console.log("Create Booking Error:", error);
    throw error;
  }
};