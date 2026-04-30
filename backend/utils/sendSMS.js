const axios = require("axios");

const sendSMS = async (phone, message) => {
    try {
        console.log("SMS FUNCTION CALLED");

        const cleanPhone = phone.toString().replace("+91", "").trim();

        console.log("SENDING SMS TO:", cleanPhone);

        const response = await axios.get(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                headers: {
                    authorization: process.env.FAST2SMS_API_KEY,
                },
                params: {
                    route: "q",
                    message: message,
                    numbers: cleanPhone,
                },
                timeout: 5000, // prevent hanging
            }
        );

        console.log("SMS SENT SUCCESS:", response.data);

    } catch (error) {
        console.log("SMS ERROR FULL:", error.response?.data || error.message);
    }
};

module.exports = sendSMS;