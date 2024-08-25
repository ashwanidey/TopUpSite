import axios from "axios";

export const sendOtp = async (otp, number) => {
  try {
    const smsdata = {
      sender_id: "FSTSMS",
      message: otp,
      langauage: "english",
      route: "p",
      numbers: number,
    };
    return axios.post("https://www.fast2sms.com/dev/bulkV2", smsdata, {
      headers: {
        Authorization: process.env.FAST2SMS_API_KEY,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};



sendOtp("1234", "9354725491");
