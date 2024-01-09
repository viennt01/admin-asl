export interface IRequestChartPricing {
  id: string;
}
export interface IDataChartPricing {
  totalPricing: string;
  date: number;
}

export interface IDataInformation {
  totalPricing: number;
  totalNewPricingInMonth: number;
  totalQuotation: number;
  totalBookingInMonth: number;
  totalNewQuotationInMonth: number;
  totalBooking: number;
  totalBookingSuccess: number;
  totalBookingSuccessInMonth: number;
  totalUser: number;
  totalPartner: number;
  totalNewPartnerInMonth: number;
  totalCutomer: number;
  totalNewCutomerInMonth: number;
  totalASLMember: number;
  totalNewASLMemberInMonth: number;
  totalSeaPricing: number;
  totalNewSeaPricingInMonth: number;
  totalSeaQuotation: number;
  totalNewSeaQuotationInMonth: number;
  totalAirPricing: number;
  totalNewAirPricingInMonth: number;
  totalAirQuotation: number;
  totalNewAirQuotationInMonth: number;
  totalTruckPricing: number;
  totalNewTruckPricingInMonth: number;
  totalTruckQuotation: number;
  totalNewTruckQuotationInMonth: number;
  totalCustomPricing: number;
  totalNewCustomPricingInMonth: number;
  totalCustomQuotation: number;
  totalNewCustomQuotationInMonth: number;
  seaPricingForChartDTOs: {
    totalPricing: number;
    date: number;
  }[];
  seaQuotationForChartDTOs: {
    totalQuotation: number;
    date: number;
  }[];
  seaBookingForChartDTOs: {
    totalBooking: number;
    date: number;
  }[];
  airPricingForChartDTOs: {
    totalPricing: number;
    date: number;
  }[];
  airQuotationForChartDTOs: {
    totalQuotation: number;
    date: number;
  }[];
  airBookingForChartDTOs: {
    totalBooking: number;
    date: number;
  }[];
  truckingPricingForChartDTOs: {
    totalPricing: number;
    date: number;
  }[];
  truckingQuotationForChartDTOs: {
    totalQuotation: number;
    date: number;
  }[];
  truckBookingForChartDTOs: {
    totalBooking: number;
    date: number;
  }[];
  customPricingForChartDTOs: {
    totalPricing: number;
    date: number;
  }[];
  customQuotationForChartDTOs: {
    totalQuotation: number;
    date: number;
  }[];
  pricingForChartDTOs: {
    totalPricing: number;
    date: number;
  }[];
  quotationForChartDTOs: {
    totalQuotation: number;
    date: number;
  }[];
  bookingForChartDTOs: {
    totalBooking: number;
    date: number;
  }[];
  aslTopSaleInMonth: IAslTopSale[];
  customerTopBooking: ICustomerTopBooking[];
}
export interface IAslTopSale {
  avatar: string;
  colorAvatar: string;
  defaultAvatar: string;
  email: string;
  fullName: string;
  quantityBooking: string;
}
export interface ICustomerTopBooking {
  companyName: string;
  abbreviations: string;
  emailCompany: string;
  quantityBooking: string;
}
