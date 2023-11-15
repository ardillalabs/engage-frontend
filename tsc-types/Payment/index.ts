import { ISubscription } from "@/reducers/Payment/@types/subscriptions.types";

export enum PaymentMethods {
    paypal = "paypal",
    stripe = "stripe",
    default = "",
  }
  
  export enum PaymentRouteStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAIL = "fail",
  }

  export interface PaymentInitialStates {
    loading: boolean;
    paymentDone: boolean;
    isSaved: boolean;
    savedStripePaymentMethods: any;
    subscriptions: [ISubscription];
    subscriptionCanceled: boolean;
    selectedSubscription: {
      method: string;
      subscriptionId: string;
    };
    coinPaymentDetails: {
      address: string;
      amount: string;
      checkout_url: string;
      confirm_needed: string;
      qrcode_url: string;
      status_url: string;
      timeout: number;
      txn_id: string;
      code?: string;
    };
    selectedPaymentMethod: {
      method: PaymentMethods;
      id: string;
    };
    subscription: {
      id: string,
      status: string
    }
    paymentMethodStateChanged: boolean,
    stripePaymentMethods: any,
    subscriptionRenewal: any
  }
  