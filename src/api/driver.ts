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

    const res = await fetch(`http://localhost:5000/api/v1/driver/${id}`, {
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
      formData.append("profile_photo", files.profile);

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

    const res = await fetch("http://localhost:5000/api/v1/driver/create", {
      method: "POST",
      headers: {
        "Authorization": token, // ⬅ same as backend expects
      },
      body: formData, // VERY IMPORTANT: no headers, browser sets boundary
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message)
    }else{
      toast.success("Driver has been successfully onboarded");
    }
  } catch (err) {
    console.error("Error creating cab:", err);
    throw err;
  }
};