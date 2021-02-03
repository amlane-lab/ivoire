import { TwilioResponseDTO } from './app.model';
export declare class OtpService {
    constructor();
    sendOTP(mobileNumber: string, otp?: string): Promise<TwilioResponseDTO>;
    verifyOTP(otp: string, verificationSid: string): Promise<TwilioResponseDTO>;
}
