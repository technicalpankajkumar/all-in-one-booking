import { encryptText } from "@/lib/encrypt";
const API_URL = import.meta.env.VITE_APP_API_URL;
export const registerUser = async (formData,loader) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data; // success message
  } catch (error) {
    return { error: error.message };
  }finally{
    loader(false)
  }
};

export const verificationUser = async (payload,loader) => {
  try{
    const res = await fetch(`${API_URL}/auth/activate-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    return res.json();
  }catch (error) {
    return { error: error.message };
  }finally{
    loader(false)
  }
};

export const loginUser = async (payload, rememberMe = false,loader) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save token + user
    localStorage.setItem("token", data?.data.token);
    localStorage.setItem("refreshToken", data?.data.refresh_token);
    localStorage.setItem("user", JSON.stringify(data?.data));

    //  Remember Me Feature
    if (rememberMe) {
      localStorage.setItem("remember_email", payload.login);
      localStorage.setItem("remember_password", encryptText(payload.password));
    } else {
      localStorage.removeItem("remember_email");
      localStorage.removeItem("remember_password");
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }finally{
    loader(false)
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token"); 
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { error: "You are not logged in." };
    }

    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token, // ⬅ same as backend expects
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      credentials: "include" // for clearing cookies if backend sets them
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Logout failed");
    }

    // 🧹 Clear stored tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    return { success: true, message: data.message };
  } catch (error) {
    return { error: error.message };
  }
};
