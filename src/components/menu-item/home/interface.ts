export interface IRequestChartPricing {
  id: string;
}
export interface IDataChartPricing {
  totalPricing: string;
  date: number;
}

export interface IDataInformation {
  totalPricing: string;
  totalQuoation: string;
  totalUser: string;
  totalPartner: string;
  totalBooking: string;
  pricingForChartDTOs: {
    totalPricing: string;
    date: number;
  }[];
  quotationForChartDTOs: {
    totalQuotation: string;
    date: number;
  }[];
  bookingForChartDTOs: {
    totalBooking: string;
    date: number;
  }[];
  aslTopSale: IAslTopSale[];
}
export interface IAslTopSale {
  avatar: string;
  colorAvatar: string;
  defaultAvatar: string;
  email: string;
  fullName: string;
  quantityBooking: string;
}
