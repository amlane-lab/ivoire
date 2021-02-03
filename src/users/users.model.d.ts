import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export declare class LLLocationDTO {
    latitude: number;
    longitude: number;
}
export declare class UserCreateDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    location: LLLocationDTO;
    salt: string;
    emailVerificationId: string;
    emailVerificationExpiry: number;
    role: string;
    otp: string;
    emailVerified: boolean;
    mobileNumberVerified: boolean;
}
export declare class UserCreateMobileDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    countryCode: string;
    countryName: string;
    location: LLLocationDTO;
    salt: string;
    emailVerificationId: string;
    emailVerificationExpiry: number;
    role: string;
    otp: string;
    emailVerified: boolean;
}
export declare class LoginDTO {
    email: string;
    password: string;
    playerId: string;
}
export declare class LogInMobileDTO {
    userName: string;
    password: string;
    playerId: string;
}
export declare class CoOridnatesDTO {
    type: string;
    coordinates: Array<number>;
}
export declare class UsersDTO {
    walletAmount: number;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    newMobileNumber: string;
    countryCode: string;
    countryName: string;
    salt: string;
    filePath: string;
    playerId: String;
    role: string;
    otp: string;
    imageUrl: string;
    imageId: string;
    registrationDate: number;
    emailVerified: boolean;
    mobileNumberVerified: boolean;
    verificationId: string;
    location: CoOridnatesDTO;
    deliveryCharge: number;
    deliveryDistanceUnit: string;
    status: boolean;
    language: string;
    emailVerificationId: string;
    emailVerificationExpiry: number;
    otpVerificationId: string;
    otpVerificationExpiry: number;
    isSuperAdmin: boolean;
}
export declare class UsersUpdateDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobileNumber?: string;
    imageUrl?: string;
    imageId?: string;
    filePath?: string;
    productExportedFile?: object;
    playerId?: string;
}
export declare class CredentialsDTO {
    email: string;
    playerId: string;
    password: string;
}
export declare class ForgotPasswordDTO {
    email: string;
}
export declare class ResetPasswordDTO {
    newPassword: string;
    email: string;
    verificationToken: string;
}
export declare class ResetNumberPasswordDTO {
    newPassword: string;
    mobileNumber: string;
    verificationToken: string;
}
export declare class ChangePasswordDTO {
    currentPassword: string;
    newPassword: string;
}
export declare class UserStatusDTO {
    status: boolean;
}
export declare class LanguageUpdateDTO {
    language: string;
}
export declare class ExportedFileDTO {
    _id?: string;
    productExportedFile: {
        url: string;
        status: string;
        publicId: string;
    };
}
export declare class AdminDTO {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    location: CoOridnatesDTO;
}
export declare class AdminDeliveryDTO {
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    countryCode?: string;
    countryName?: string;
    email: string;
    password?: string;
    role?: string;
    emailVerificationId: string;
    emailVerificationExpiry: number;
    salt: string;
    emailVerified: boolean;
}
export declare class LoginResponseDTO {
    token: string;
    role: string;
    id: string;
    language: string;
}
export declare class ResponseLogin {
    response_code: string;
    response_data: LoginResponseDTO;
}
export declare class UserMeDTO extends UsersUpdateDTO {
    _id: string;
    email: string;
    language: string;
    walletAmount: number;
}
export declare class ResponseMe {
    response_code: string;
    response_data: UserMeDTO;
}
export declare class AdminUserDTO {
    _id: string;
    status: boolean;
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    language: string;
    createdAt: string;
    emailVerified: boolean;
    orderDelivered: number;
}
export declare class ResponseAdminUserList {
    response_code: string;
    response_data: AdminUserDTO;
}
export declare class ResponseAdminDeliveryList {
    response_code: string;
    response_data: AdminUserDTO;
}
export declare class OTPVerifyDTO {
    mobileNumber: string;
    otp: string;
    sId: string;
}
export declare class OTPSendDTO {
    mobileNumber: string;
    countryCode: string;
}
