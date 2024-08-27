import fetch from "node-fetch";
import CryptoJS from "crypto-js";

export const queryPoints = async (req, res) => {
  try {
    // Retrieve UID and email from environment variables
    let email = process.env.API_EMAIL;
    let uid = process.env.API_UID;
    
    let product = "mobilelegends";
    let time = Math.floor(Date.now() / 1000);
    const m_key = process.env.API_MKEY;

    // Create an object with the fields
    const sign_obj = {
      email: email,
      uid: uid,
      product: product,
      time: time,
    };

    // Sort the object by key
    const sorted_keys = Object.keys(sign_obj).sort();
    const sorted_sign_obj = {};
    sorted_keys.forEach((key) => {
      sorted_sign_obj[key] = sign_obj[key];
    });

    // Construct the string to be hashed
    let str = "";
    for (let key in sorted_sign_obj) {
      str += key + "=" + sorted_sign_obj[key] + "&";
    }

    // Generate the sign using double MD5 hashing
    function md5(string) {
      return CryptoJS.MD5(string).toString();
    }

    const sign = md5(md5(str + m_key));

    // Make a POST request to the query points API
    const response = await fetch("https://www.smile.one/smilecoin/api/querypoints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        uid: uid,
        product: product,
        time: time,
        sign: sign,
      }),
    });

    const data = await response.json();

    if (data.status === 200) {
      res.status(200).json({
        status: data.status,
        message: data.message,
        smile_points: data.smile_points,
      });
    } else {
      res.status(400).json({ status: data.status, message: data.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const queryPointsPh = async (req, res) => {
  try {
    // Retrieve UID and email from environment variables
    let email = process.env.API_EMAIL;
    let uid = process.env.API_UID;
    
    let product = "mobilelegends";
    let time = Math.floor(Date.now() / 1000);
    const m_key = process.env.API_MKEY;

    // Create an object with the fields
    const sign_obj = {
      email: email,
      uid: uid,
      product: product,
      time: time,
    };

    // Sort the object by key
    const sorted_keys = Object.keys(sign_obj).sort();
    const sorted_sign_obj = {};
    sorted_keys.forEach((key) => {
      sorted_sign_obj[key] = sign_obj[key];
    });

    // Construct the string to be hashed
    let str = "";
    for (let key in sorted_sign_obj) {
      str += key + "=" + sorted_sign_obj[key] + "&";
    }

    // Generate the sign using double MD5 hashing
    function md5(string) {
      return CryptoJS.MD5(string).toString();
    }

    const sign = md5(md5(str + m_key));

    // Make a POST request to the query points API
    const response = await fetch("https://www.smile.one/ph/smilecoin/api/querypoints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        uid: uid,
        product: product,
        time: time,
        sign: sign,
      }),
    });

    const data = await response.json();

    if (data.status === 200) {
      res.status(200).json({
        status: data.status,
        message: data.message,
        smile_points: data.smile_points,
      });
    } else {
      res.status(400).json({ status: data.status, message: data.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
