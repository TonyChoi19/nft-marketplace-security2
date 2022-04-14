import React from 'react'
const {Auth, LoginCredentials} = require('two-step-auth')

async function sendOTP(emailId){
    try {
        const res = await Auth(emailId, "NEXT NFT");
        const otp = res.OTP
        const success = res.success
        return {otp, success }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendOTP }