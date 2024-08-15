const otpStorage = {}; // In-memory storage

const saveOTPToStorage = (email, hashedOTP, expiresIn) => {
    otpStorage[email] = {
        otp: hashedOTP,
        expiresAt: Date.now() + expiresIn,
    };
};

const getStoredData = (email) => {
    return otpStorage[email];
};

const deleteStoredOTP = (email) => {
    delete otpStorage[email];
};

module.exports = {
    saveOTPToStorage,
    getStoredData,
    deleteStoredOTP,
};
