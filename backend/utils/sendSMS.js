const axios = require("axios");

const sendSMS = async (phone, message) => {

    try {

        const cleanPhone = phone.toString().replace("+91", "").trim();

        const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
            headers: {
                authorization: process.env.FAST2SMS_API_KEY,
            },
            params: {
                message: message,
                numbers: cleanPhone,
                route: "q",
            },
        });

        console.log("✅ SMS SENT SUCCESS:", response.data);

    } catch (error) {
        console.log("❌ SMS ERROR:", error.response?.data || error.message);
    }
};

module.exports = sendSMS;