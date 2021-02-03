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
const Stripe = require("stripe");
let stripe;
let StripeService = class StripeService {
    constructor() {
        if (process.env.STRIPE_SECRET_KEY)
            stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        else
            console.log("STRIPE_SECRET_KEY not set.");
    }
    async createChargePayment(obj) {
        return stripe.charges.create(obj);
    }
    async createPaymentIntents(obj) {
        return stripe.paymentIntents.create(obj);
    }
    async capturePaymentIntents(id, obj) {
        return stripe.paymentIntents.capture(id, obj);
    }
    async createCheckoutSession(obj) {
        return await stripe.checkout.sessions.create(obj);
    }
    async webhookVerify(payload, sig) {
        return await stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_END_POINT_SECRET_WEBHOOK);
    }
};
StripeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map