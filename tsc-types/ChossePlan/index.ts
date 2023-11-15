export interface ChooseYourPlanInitialStates {
    loading: boolean;
    chooseYourPlan: {
      planType: string;
      planDate: string;
    };
    choosePlanModal: boolean;
    permissionList: Array<any> | null;
    membershipDedails: {
      id: number,
      name: string,
      monthly_payment: number,
      yearly_payment: number,
      stripe_yearly_price_id: string,
      stripe_monthly_price_id: string,
      paypal_yearly_price_id: string,
      paypal_monthly_price_id: string,
      status: true
    } | null;
  }
  