"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_model_1 = require("./app.model");
const request = require('request');
var client;
let OtpService = class OtpService {
    constructor() {
        if (process.env.USE_SENDINBLUE_OTP == 'false') {
            if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
                client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            else
                console.log("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN is not set");
        }
        else {
            if (process.env.SENDINBLUE_API_KEY_FOR_OTP === '')
                console.log(`SENDINBLUE_API_KEY_FOR_OTP is not set`);
        }
    }
    async sendOTP(mobileNumber, otp) {
        try {
            otp = `${otp} is secret otp for verification. Please don't share it with anyone.`;
            if (process.env.USE_SENDINBLUE_OTP === 'true') {
                const options = {
                    method: 'POST',
                    url: process.env.SENDINBLUE_URL_FOR_OTP,
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        'api-key': process.env.SENDINBLUE_API_KEY_FOR_OTP
                    },
                    body: {
                        type: 'transactional',
                        sender: 'Ionic',
                        recipient: mobileNumber,
                        content: otp
                    },
                    json: true
                };
                const otpData = await request(options);
                let body = JSON.parse(otpData.body);
                if (otpData && body.recipient) {
                    return {
                        isError: false,
                        data: body.recipient
                    };
                }
                else {
                    return {
                        isError: true,
                        data: otpData.message
                    };
                }
            }
            else {
                let otpData = await client.verify.services(process.env.TWILIO_SID).verifications.create({ to: mobileNumber, channel: 'sms' });
                if (otpData && otpData.sid) {
                    return {
                        isError: false,
                        data: otpData.sid
                    };
                }
                else {
                    return {
                        isError: true,
                        data: app_model_1.ResponseMessage.SOMETHING_WENT_WRONG
                    };
                }
            }
        }
        catch (e) {
            console.log("Otp Catch Error", e);
            return {
                isError: true,
                data: e.message
            };
        }
    }
    async verifyOTP(otp, verificationSid) {
        try {
            let otpData = await client.verify.services(process.env.TWILIO_SID).verificationChecks.create({ verificationSid: verificationSid, code: otp });
            if (otpData && otpData.status == 'approved') {
                return {
                    isError: false,
                    data: otpData.sid
                };
            }
            else {
                return {
                    isError: true,
                    data: "Invalid otp"
                };
            }
        }
        catch (e) {
            console.log("Twilio Verify Otp Catch Error", e);
            return {
                isError: true,
                data: e.message
            };
        }
    }
};
OtpService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map