import CryptoJS from "crypto-js";

const SECRET_KEY = "your_secret_key_12345"; // store in .env in production

export const encryptText = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const loadRememberedData = () => {
  const login = localStorage.getItem("remember_email");
  const encryptedPass = localStorage.getItem("remember_password");

  return {
    login: login || "",
    password: encryptedPass ? decryptText(encryptedPass) : "",
  };
};