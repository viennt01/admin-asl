export enum TYPE_LOCATION {
  'PORT' = 'Port',
  'INDUSTRIAL_ZONE' = 'Industrial Zone',
  'DEPOT' = 'Depot',
  'AIR_PORT' = 'Airport',
}

export enum TYPE_LOAD_CAPACITY {
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'TOTAL' = '',
}

export enum TYPE_UNIT {
  'SEA' = 'Sea',
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'ALL' = 'All',
  'TOTAL' = '',
  'PACKAGE' = 'Package',
}

//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    bookingNo: string;
    bookingDated: string;
    modeOfTransportation: string;
    pol: string;
    pod: string;
    quotationNo: string;
    valitidyTo: string;
    commodity: string;
    seaBookingFCLDetailDTOs: {
      containerTypeCode: string;
      quantity: string;
    }[];
    cargoReadyDated: string;
    demSeaQuotation: string;
    detSeaQuotation: string;
    stoSeaQuotation: string;
    effectDated: string;
    freqDate: string;
    transitTimeSeaQuotation: string;
    typeOfServiceTransportation: string;
    vendorName: string;
  };
  seaQuotationBooking: {
    quotationNo: string;
    seaQuotationFCLDetails: IDetailPriceVAT[];
    sumSeaQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  truckingQuotationPOLSelected: {
    quotationNo: string;
    truckingQuotationFCLDetails: IDetailPriceVAT[];
    sumTruckingQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  truckingQuotationPODSelected: {
    quotationNo: string;
    truckingQuotationFCLDetails: IDetailPriceVAT[];
    sumTruckingQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  customQuotationPOLSelected: {
    quotationNo: string;
    customQuotationFCLDetailSelecteds: ICustomQuotationFCLDetailSelecteds[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  customQuotationPODSelected: {
    quotationNo: string;
    customQuotationFCLDetailSelecteds: ICustomQuotationFCLDetailSelecteds[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  aslContactBooking: {
    issuedBy: string;
    possition: string[];
    email: string;
    tel: string;
  };
}

export interface ITotalPrice {
  item1: string;
  item2: string;
}
export interface IDetailPrice {
  description: string;
  unit: string;
  price: string;
  quantity: string;
  currency: string;
  totalAmount: string;
}
export interface IDetailPriceVAT extends IDetailPrice {
  vat: string;
}

export interface ICustomQuotationFCLDetailSelecteds {
  basePriceRedLane: string;
  basePriceYellowLane: string;
  basePriceGreenLane: string;
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
  vat: string;
  unit: string;
  quantity: string;
  totalRedLane: string;
  totalYellowLane: string;
  totalGreenLane: string;
}
export interface ICustomerInformation {
  customer: string;
  companyName: string;
  email: string;
  address: string;
  addressCompany: string;
  tel: string;
  mobil: string;
  contact: string;
}
export interface IRequireDetailBooking {
  id?: string;
}
export interface IRequireConfirmBooking {
  id?: string;
}
export interface IRequireSendListEmail {
  bookingID: string;
  listEmail: string[];
}
export interface ITypeDeclaration {
  typeDelaracrionName: string;
}
