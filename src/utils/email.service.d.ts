import { UtilService } from './util.service';
export declare class EmailService {
    private utilService;
    constructor(utilService: UtilService);
    sendEmail(email: string, subject: string, text?: string, html?: string, attachment?: any): Promise<any>;
    emailVerifyTemplate(html: any, verifyButton: any, emailverificationId: string, email: string): Promise<string>;
    sendEmailForForgotPassword(firstName: string, email: string, otp: number): Promise<any>;
    sendEmailForVerification(firstName: string, email: string, emailVerificationId: string): Promise<any>;
    invoiceTemplate(order: any, cart: any, business: any): Promise<any>;
    createInvoice(order: any, carts: any, business: any): Promise<unknown>;
    sendEmailOrder(order: any, cart: any, business?: any, isCompleted?: boolean): Promise<any>;
    sendEmailForPlacedOrder(order: any, cart: any): Promise<void>;
    sendEmailOrderDelivered(order: any, cart: any, business: any): Promise<void>;
}
