import { OrderService } from './order.service';
import { UsersDTO } from '../users/users.model';
import { OrderPosPaymentUpdateDTO, OrderAddItemDTO, OrderUpdateDTO, OrderPosDTO, OrderStatusDTO, AssignOrderDTO, OrderFilterQuery, OrderCreateDTO, DBStatusUpdateDTO, OrderStartEndDTO, OrderGraphsDTO } from './order.model';
import { CommonResponseModel, UserQuery } from '../utils/app.model';
import { UtilService } from '../utils/util.service';
import { WalletService } from '../wallet/wallet.service';
import { AppGateway } from '../app.gateway';
import { ProductService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { AddressService } from '../address/address.service';
import { SettingService } from '../settings/settings.service';
import { SequenceService } from '../sequence/sequence.service';
import { UserService } from '../users/users.service';
import { NotificationService } from '../notifications/notifications.service';
import { PushService } from '../utils/push.service';
import { StripeService } from '../utils/stripe.service';
import { CategoryService } from '../categories/categories.service';
import { EmailService } from '../utils/email.service';
import { BusinessService } from '../business/business.service';
import { ProductOutOfStockService } from '../product-out-of-stock/product-out-of-stock.service';
import { DeliveryBoyRatingsService } from '../delivery-boy-ratings/delivery-boy-ratings.service';
import { CouponService } from '../coupons/coupons.service';
export declare class OrderController {
    private orderService;
    private utilService;
    private cartService;
    private walletService;
    private addressService;
    private settingService;
    private productService;
    private categoryService;
    private sequenceService;
    private userService;
    private notificationService;
    private pushService;
    private stripeService;
    private emailService;
    private socketService;
    private businessService;
    private productOutOfStockService;
    private deliveryBoyRatingsService;
    private couponService;
    constructor(orderService: OrderService, utilService: UtilService, cartService: CartService, walletService: WalletService, addressService: AddressService, settingService: SettingService, productService: ProductService, categoryService: CategoryService, sequenceService: SequenceService, userService: UserService, notificationService: NotificationService, pushService: PushService, stripeService: StripeService, emailService: EmailService, socketService: AppGateway, businessService: BusinessService, productOutOfStockService: ProductOutOfStockService, deliveryBoyRatingsService: DeliveryBoyRatingsService, couponService: CouponService);
    GetOrderListForUser(user: UsersDTO, userQuery: UserQuery): Promise<CommonResponseModel>;
    getOrderDetailForUser(user: UsersDTO, orderId: string): Promise<CommonResponseModel>;
    placeOrder(userData: UsersDTO, orderData: OrderCreateDTO): Promise<{
        response_code: any;
        response_data: string;
    }>;
    orderCancelledByUser(user: UsersDTO, orderId: string): Promise<CommonResponseModel>;
    assignedOrderListForDeliveryBoy(user: UsersDTO, userQuery: UserQuery): Promise<CommonResponseModel>;
    deliveredOrderListForDeliveryBoy(user: UsersDTO, userQuery: UserQuery): Promise<CommonResponseModel>;
    getOrderDetailForDeliveryBoy(user: UsersDTO, orderId: string): Promise<CommonResponseModel>;
    orderAcceptByDeliveryBoy(user: UsersDTO, orderId: string): Promise<CommonResponseModel>;
    orderRejectedByDeliveryBoy(user: UsersDTO, orderId: string): Promise<CommonResponseModel>;
    orderStatusUpdateByDeliveryBoy(user: UsersDTO, orderId: string, statusUpdate: DBStatusUpdateDTO): Promise<CommonResponseModel>;
    index(user: UsersDTO, query: OrderFilterQuery): Promise<CommonResponseModel>;
    getOrderDetails(user: UsersDTO, orderId: string): Promise<{
        response_code: any;
        response_data: string;
    }>;
    getOrderDelete(user: UsersDTO, orderId: string): Promise<{
        response_code: any;
        response_data: string;
    }>;
    updateOrderStatus(user: UsersDTO, orderId: string, orderData: OrderStatusDTO): Promise<CommonResponseModel>;
    assignOrder(user: UsersDTO, orderId: string, assignData: AssignOrderDTO): Promise<CommonResponseModel>;
    getOrderStatusTypeList(user: UsersDTO): Promise<CommonResponseModel>;
    oderGraph(user: UsersDTO): Promise<CommonResponseModel>;
    invoiceDownload(user: UsersDTO, res: any, orderId: string, token: string): Promise<any>;
    orderTable(user: UsersDTO, orderStartEndDTO: OrderStartEndDTO): Promise<CommonResponseModel>;
    categoryModeGraph(user: UsersDTO, orderGraphsDTO: OrderGraphsDTO): Promise<CommonResponseModel>;
    productModeGraph(user: UsersDTO, orderGraphsDTO: OrderGraphsDTO): Promise<CommonResponseModel>;
    productModeTable(user: UsersDTO, orderGraphsDTO: OrderGraphsDTO): Promise<CommonResponseModel>;
    salesGraph(user: UsersDTO, orderGraphsDTO: OrderGraphsDTO): Promise<CommonResponseModel>;
    paymentModeGraph(user: UsersDTO, orderGraphsDTO: OrderGraphsDTO): Promise<CommonResponseModel>;
    userRegisteredGraph(user: UsersDTO, orderGraphsDTO: OrderGraphsDTO): Promise<CommonResponseModel>;
    dataFetch: (pageArr: any) => Promise<void>;
    scriptToUpdate(): Promise<CommonResponseModel>;
    webhookStripe(request: any): Promise<{
        response_code: any;
        response_data: string;
    }>;
    orderByPos(user: UsersDTO, posOrderData: OrderPosDTO): Promise<CommonResponseModel>;
    posOder(user: UsersDTO, query: OrderFilterQuery): Promise<CommonResponseModel>;
    posOrderPaymentUpdate(user: UsersDTO, orderId: string, orderPosPaymentUpdateDTO: OrderPosPaymentUpdateDTO): Promise<CommonResponseModel>;
    orderUpdate(user: UsersDTO, orderId: string, orderUpdateDTO: OrderUpdateDTO): Promise<CommonResponseModel>;
    orderCartItemDelete(user: UsersDTO, orderId: string, itemId: string): Promise<CommonResponseModel>;
    orderAddItem(user: UsersDTO, orderId: string, orderData: OrderAddItemDTO): Promise<CommonResponseModel>;
    orderPosAddItem(user: UsersDTO, orderId: string, orderData: OrderAddItemDTO): Promise<CommonResponseModel>;
    orderPosCartItemDelete(user: UsersDTO, orderId: string, itemId: string): Promise<CommonResponseModel>;
    posOrderUpdate(user: UsersDTO, orderId: string, orderUpdateDTO: OrderUpdateDTO): Promise<CommonResponseModel>;
    getCutOffAmount(user: UsersDTO, orderId: string): Promise<CommonResponseModel>;
    orderUpdateNotifyMailAndPush(user: UsersDTO, orderId: string): Promise<CommonResponseModel>;
}