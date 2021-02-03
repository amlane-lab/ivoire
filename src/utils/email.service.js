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
const ejs = require('ejs');
const appRoot = require('app-root-path');
var pdf = require('html-pdf');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const util_service_1 = require("./util.service");
const app_model_1 = require("./app.model");
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
const request = require('request');
const nodemailer_1 = require("nodemailer");
let EmailService = class EmailService {
    constructor(utilService) {
        this.utilService = utilService;
        if (process.env.USE_SENDINBLUE_EMAIL == 'false') {
            if (process.env.SENDGRID_KEY && process.env.SENDGRID_FROM)
                sgMail.setApiKey(process.env.SENDGRID_KEY);
            else
                console.log("SENDGRID_KEY or SENDGRID_FROM is not set.");
        }
        else {
            if (process.env.SENDINBLUE_USER && process.env.SENDINBLUE_PASSWORD && process.env.SENDINBLUE_HOST_NAME) {
            }
            else
                console.log(`SENDINBLUE_USER, SENDINBLUE_PASSWORD or SENDINBLUE_HOST_NAME is not set.`);
        }
    }
    async sendEmail(email, subject, text, html, attachment) {
        if (email) {
            let response;
            if (process.env.USE_SENDINBLUE_EMAIL === 'true') {
                let msg = {
                    to: email,
                    from: process.env.SENDINBLUE_USER,
                    subject: subject
                };
                if (text)
                    msg['text'] = text;
                if (html)
                    msg['html'] = html;
                if (attachment) {
                    msg['attachments'] = [{
                            content: attachment,
                            filename: "invoice.pdf",
                            type: "application/pdf",
                            disposition: "attachment"
                        }];
                }
                const transporter = nodemailer_1.createTransport({
                    host: process.env.SENDINBLUE_HOST_NAME,
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.SENDINBLUE_USER,
                        pass: process.env.SENDINBLUE_PASSWORD,
                    },
                });
                response = await transporter.sendMail(msg);
                console.log("email response from sendinblue", response);
            }
            else {
                let msg = {
                    to: email,
                    from: process.env.SENDGRID_FROM,
                    subject: subject
                };
                if (text)
                    msg['text'] = text;
                if (html)
                    msg['html'] = html;
                if (attachment) {
                    msg['attachments'] = [{
                            content: attachment,
                            filename: "invoice.pdf",
                            type: "application/pdf",
                            disposition: "attachment"
                        }];
                }
                response = await sgMail.send(msg);
                console.log("email response from sendgrid", response);
            }
            return response;
        }
    }
    async emailVerifyTemplate(html, verifyButton, emailverificationId, email) {
        let url = process.env.NODE_ENV === 'production' ? process.env.API_URL_PRODUCTION : process.env.API_URL_STAGING;
        url += `/users/verify-email?verificationId=${emailverificationId}&email=${email}`;
        const htmlData = `<p>${html}</p><br><a href="${url}" target="_blank">${verifyButton}</a>`;
        return htmlData;
    }
    async sendEmailForForgotPassword(firstName, email, otp) {
        const subject = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_FORGOT_PASSWORD_EMAIL_SUBJECT);
        let html = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_FORGOT_PASSWORD_EMAIL_BODY);
        html = html.replace('${firstName}', firstName);
        html = html.replace('${OTP}', `${otp}`);
        return await this.sendEmail(email, subject, null, html);
    }
    async sendEmailForVerification(firstName, email, emailVerificationId) {
        const subject = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_SUBJECT);
        const verifyButton = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_BUTTON);
        let html = await this.utilService.getTranslatedMessageByKey(app_model_1.ResponseMessage.USER_EMAIL_VERIFY_BODY);
        html = html.replace('${firstName}', firstName);
        const mailBody = await this.emailVerifyTemplate(html, verifyButton, emailVerificationId, email);
        const emailRes = await this.sendEmail(email, subject, null, mailBody);
        return emailRes;
    }
    async invoiceTemplate(order, cart, business) {
        try {
            var newDate = new Date(order.createdAt);
            var formattedDate = newDate.getDate() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getFullYear();
            const text = {
                invoice: 'Invoice',
                date: 'Date',
                payment: 'Payment',
                billTo: 'Bill to',
                sl: 'Sl.',
                item: 'Item',
                qty: 'Qty',
                price: 'Price',
                discount: 'Discount',
                total: 'Total',
                subTotal: 'Sub Total',
                deliveryCharge: 'Delivery Charges',
                tax: 'Tax',
                couponDiscount: 'Coupon Discount',
                wallet: 'Wallet',
                grandTotal: 'Grand Total',
            };
            const info = {
                storeName: business.storeName,
                storeAddress: business.address,
                storePhone: business.phoneNumber,
                storeEmail: business.email,
                invoiceTitle: "Invoice",
                orderId: order.orderID,
                deliveryDate: formattedDate,
                paymentType: order.paymentType,
                userName: `${order.user.firstName} ${order.user.lastName}`,
                userAddress: order.address.address,
                userMobile: order.user.mobileNumber,
                userEmail: order.user.email,
                products: order.cart,
                subTotal: this.utilService.convertToDecimal(order.subTotal),
                deliveryCharges: this.utilService.convertToDecimal(order.deliveryCharges),
                tax: this.utilService.convertToDecimal(order.tax),
                couponDiscount: this.utilService.convertToDecimal(order.couponAmount ? order.couponAmount : 0),
                walletAmount: this.utilService.convertToDecimal(order.usedWalletAmount),
                isWalletUsed: order.isWalletUsed,
                grandTotal: this.utilService.convertToDecimal(order.grandTotal),
                currency: order.currencySymbol,
                text: text
            };
            const templatePath = `${appRoot.path}/components/order_invoice.ejs`;
            const templateHtml = await fs.readFileSync(templatePath, 'utf-8');
            const htmlBody = await ejs.render(templateHtml, info);
            return htmlBody;
        }
        catch (e) {
            console.log(e);
        }
    }
    async createInvoice(order, carts, business) {
        const htmlBodyPDF = await this.invoiceTemplate(order, carts, business);
        const prom = new Promise(function (resolve, reject) {
            var options = { "format": "Letter", "base": `file://${appRoot.path}/` };
            pdf.create(htmlBodyPDF, options).toFile("invoice.pdf", function (err, pdfRes) {
                if (err) {
                    console.log("invoicePdfGenerate: " + err);
                    reject(err);
                }
                else
                    resolve(pdfRes.filename);
            });
        });
        return prom;
    }
    async sendEmailOrder(order, cart, business, isCompleted = false) {
        var newDate = new Date(order.createdAt);
        var formattedDate = newDate.getDate() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getFullYear();
        var url = process.env.API_URL_PRODUCTION;
        var baseUrl = url.replace(/^[^.]+\./g, "");
        var webName = baseUrl;
        var webUrl = "https://" + baseUrl;
        var logo = "https://" + baseUrl + "/assets/images/webapp.png";
        let subject = "Your order has been received!";
        if (baseUrl == "ionicfirebaseapp.com")
            logo = "https://grocery-web.ionicfirebaseapp.com/assets/images/webapp.png";
        let text = {
            thankYouMessage: 'Thank you for your purchase !',
            message: "We've received your order #" + order.orderID + ", and it is now being processed:",
            orderDetail: 'Order Detail',
            orderNumber: 'Order Number',
            orderDate: 'Order Date',
            paymentStatus: 'Payment Status',
            billTo: 'Bill To',
            product: 'Product',
            qty: 'Quantity/Size',
            modifiedQty: 'Modified',
            price: 'Price',
            discount: 'Discount',
            subTotal: 'Sub Total',
            deliveryCharge: 'Delivery Charges',
            tax: 'Tax',
            couponDiscount: 'Coupon Discount',
            wallet: 'Used Wallet Amount',
            grandTotal: 'Grand Total',
            orderModified: "Note:-"
        };
        let attachment = null;
        if (isCompleted) {
            text.thankYouMessage = "Thanks for shopping with us";
            text.message = "We have finished processing your order.";
            subject = "Your order is now complete";
            let pathToAttachment = await this.createInvoice(order, cart, business);
            attachment = await fs.readFileSync(pathToAttachment).toString("base64");
        }
        let info = {
            orderId: order.orderID,
            orderDate: formattedDate,
            paymentType: order.paymentType,
            userName: `${order.user.firstName} ${order.user.lastName}`,
            userAddress: order.address.address,
            userMobile: order.user.mobileNumber,
            userEmail: order.user.email,
            products: order.cart,
            subTotal: this.utilService.convertToDecimal(order.subTotal),
            deliveryCharges: this.utilService.convertToDecimal(order.deliveryCharges),
            tax: this.utilService.convertToDecimal(order.tax),
            walletAmount: this.utilService.convertToDecimal(order.usedWalletAmount),
            couponDiscount: this.utilService.convertToDecimal(order.couponAmount ? order.couponAmount : 0),
            isWalletUsed: order.isWalletUsed,
            grandTotal: this.utilService.convertToDecimal(order.grandTotal),
            currency: order.currencySymbol,
            webName: webName,
            webUrl: webUrl,
            logo: logo,
            text: text,
            isOrderModified: order.isOrderModified,
            amountRefundedOrderModified: "Item updated " + order.currencySymbol + order.amountRefundedOrderModified
        };
        console.log(info);
        try {
            const templatePath = `${appRoot.path}/components/order.ejs`;
            const templateHtml = await fs.readFileSync(templatePath, 'utf-8');
            const htmlBody = await ejs.render(templateHtml, info);
            console.log(htmlBody);
            return await this.sendEmail(order.user.email, subject, null, htmlBody, attachment);
        }
        catch (e) {
            console.log(e);
        }
    }
    async sendEmailForPlacedOrder(order, cart) {
        this.sendEmailOrder(order, cart, null);
    }
    async sendEmailOrderDelivered(order, cart, business) {
        this.sendEmailOrder(order, cart, business, true);
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [util_service_1.UtilService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map