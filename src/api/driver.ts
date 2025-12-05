import { toast } from "sonner";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const getDriverListing = async () => {
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/driver`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if (!data.success) {
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

    const res = await fetch(`${API_URL}/driver/${id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();
    if (!data.success) {
      toast.error(data.message)
    }
    console.log(data.driver)
    return data.driver || [];

  } catch (error) {
    console.error("Error fetching cabs:", error);
    throw error;
  }
};

export const addDriver = async (doc, files) => {
  try {
    const formData = new FormData();

    // 1) Append Driver JSON data as string
    formData.append("data", JSON.stringify(doc));

    // 2) Append files with correct field names
    if (files.profile)
      formData.append("profile", files.profile);

    if (files.aadhar_front)
      formData.append("aadhar_front", files.aadhar_front);

    if (files.aadhar_back)
      formData.append("aadhar_back", files.aadhar_back);

    if (files.pan)
      formData.append("pan_image", files.pan);  // backend expects pan_image

    if (files.driving_license_front)
      formData.append("license_front", files.driving_license_front);

    if (files.driving_license_back)
      formData.append("license_back", files.driving_license_back);

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/driver/create`, {
      method: "POST",
      headers: {
        "Authorization": token, // ⬅ same as backend expects
      },
      body: formData, // VERY IMPORTANT: no headers, browser sets boundary
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message)
    } else {
      toast.success("Driver has been successfully onboarded");
    }
  } catch (err) {
    console.error("Error creating cab:", err);
    throw err;
  }
};

export const updateDriver = async (driverId, updatedData, files, deletedImages = []) => {
  try {
    const formData = new FormData();

    // 1) Append updated JSON data
    formData.append("data", JSON.stringify(updatedData));

    // 2) Append deleted image IDs (if any)
    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }

    // 3) Append new files with proper key names
    if (files.profile)
      formData.append("profile", files.profile);

    if (files.aadhar_front)
      formData.append("aadhar_front", files.aadhar_front);

    if (files.aadhar_back)
      formData.append("aadhar_back", files.aadhar_back);

    if (files.pan)
      formData.append("pan_image", files.pan); // backend expects pan_image

    if (files.driving_license_front)
      formData.append("license_front", files.driving_license_front);

    if (files.driving_license_back)
      formData.append("license_back", files.driving_license_back);

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    // REQUEST
    const res = await fetch(`${API_URL}/driver/update/${driverId}`, {
      method: "PUT",
      headers: {
        "Authorization": token, // DO NOT add Content-Type
      },
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
      return data;
    }

    toast.success("Driver updated successfully");
    return data;

  } catch (err) {
    console.error("Error updating driver:", err);
    toast.error("Update failed");
    throw err;
  }
};

export const deleteDriver = async (driverId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { error: "Unauthorized. Please login." };
    }

    const res = await fetch(`${API_URL}/driver/${driverId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      }
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Driver deleted successfully");
    } else {
      toast.error(data.message);
    }

    return data;

  } catch (err) {
    console.error("Delete driver error:", err);
    toast.error("Something went wrong");
  }
};
