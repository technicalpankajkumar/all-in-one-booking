import { toast } from "sonner";

export const getDriverListing = async () => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch("http://localhost:5000/api/v1/driver", {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if(!data.success){
        toast.error(data.message)
    }
    return data.drivers || [];

  } catch (error) {
    console.error("Error fetching cabs:", error);
    throw error;
  }
};

export const getDriverById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`http://localhost:5000/api/v1/driver/${id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if(!data.success){
        toast.error(data.message)
    }
    console.log(data.driver)
    return data.driver || [];

  } catch (error) {
    console.error("Error fetching cabs:", error);
    throw error;
  }
};