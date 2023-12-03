import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export interface ICustomPricing {
  customPricingID: string;
  typeDelaracrionID: string;
  typeDelaracrionName: string;
  partnerID: string;
  vendor: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyAbbreviations: string;
  transactionTypeID: string;
  transactionTypeName: string;
  note: string;
  effectDated: string;
  validityDate: string;
  public: boolean;
  statusCustomPricing: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface SeaPricingDetailDTOs {
  [key: string]: string;
}

export interface ICustomPricingTable
  extends Omit<ICustomPricing, 'customPricingID'> {
  key: string;
  searchAll: string;
}

export interface ICustomPricingRequire extends IPagination {
  data: ICustomPricing[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  statusCustomPricing: string[];
}

export interface RequestSeaPricing
  extends IQueryInputParamType,
    IQuerySelectParamType {
  paginateRequest: IPagination;
}

export type SelectSearch = {
  [key in keyof IQueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface ICustomPricingDetailDataBody {
  id: string;
}

export interface IFormValues {
  customPricingID: string;
  typeDelaracrionID: string;
  partnerID: string;
  commodityID: string;
  currencyID: string;
  transactionTypeID: string;
  note: string;
  effectDated: Dayjs;
  validityDate: Dayjs;
  public: boolean;
  statusCustomPricing: string;
  customPricingFeeGroupDTOs: string[];
  customPricingLCLDetailDTO: ICustomPricingLCLDetailDTO;
  customPricingFCLDetailDTOs: ICustomPricingFCLDetailDTOs[];
  customPricingAirDetailDTO: ICustomPricingAirDetailDTO;
}

export interface ICustomPricingLCLDetailDTO {
  customPricingLCLDetailID?: string;
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
}
export interface ICustomPricingFCLDetailDTOs {
  customPricingFCLDetailID?: string;
  unitID: string;
  internationalCode?: string;
  basePriceRedLane: string;
  basePriceGreenLane: string;
  basePriceYellowLane: string;
  priceRedLane: string;
  priceGreenLane: string;
  priceYellowLane: string;
}

export interface ICustomPricingAirDetailDTO {
  customPricingAirDetailID?: string;
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
}

export interface ICustomPricingDetailType
  extends Omit<IFormValues, 'customPricingFeeGroupDTOs'> {
  vendor: string;
  typeDelaracrionName: string;
  typeDelaracrionCode: string;
  typeDelaracrionDesctipton: string;
  commodityName: string;
  transactionTypeName: string;
  currencyAbbreviations: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  customPricingFeeGroupDTOs: ICustomPricingFeeFormValue[];
}

export interface ICustomPricingFeeFormValue {
  customPricingFeeGroupID?: string;
  feeGroupID: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type ICustomPricingFeeDTOsCreate = Omit<
  ICustomPricingFeeFormValue,
  | 'customPricingFeeGroupID'
  | 'insertedByUser'
  | 'dateInserted'
  | 'dateUpdated'
  | 'updatedByUser'
>;

export type ICustomPricingFeeUpdate = Omit<
  ICustomPricingFeeFormValue,
  'insertedByUser' | 'dateInserted' | 'dateUpdated' | 'updatedByUser'
> & {
  isDelete: boolean;
};

export type ICustomPricingCreate = Omit<
  IFormValues,
  | 'customPricingID'
  | 'effectDated'
  | 'validityDate'
  | 'customPricingFeeGroupDTOs'
  | 'customPricingLCLDetailDTO'
  | 'customPricingFCLDetailDTOs'
  | 'customPricingAirDetailDTO'
> & {
  effectDated: number;
  validityDate: number;
  customPricingFeeGroupRegisterRequests: ICustomPricingFeeDTOsCreate[];
  customPricingLCLDetailRegisterRequest: ICustomPricingLCLDetailDTO;
  customPricingFCLDetailRegisterRequests: ICustomPricingFCLDetailDTOs[];
  customPricingAirDetailRegisterRequest: ICustomPricingAirDetailDTO;
};

export type ICustomPricingEdit = Omit<
  IFormValues,
  | 'effectDated'
  | 'validityDate'
  | 'customPricingFeeGroupDTOs'
  | 'customPricingLCLDetailDTO'
  | 'customPricingFCLDetailDTOs'
  | 'customPricingAirDetailDTO'
> & {
  effectDated: number;
  validityDate: number;
};
export type SeaPricingDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  searchAll: string;
}
export interface QuerySelectDraft {
  status: string;
}
export interface RequestTableDraft extends QueryInputDraft, QuerySelectDraft {
  paginateRequest: IPagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatus {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  searchAll: string;
  status: string;
}
export interface RequestTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}

// get all location
export interface IDataLocation {
  locationID: string;
  locationName: string;
}

// get all commodity
export interface RequireCommodity {
  commodityID: string;
  commodityName: string;
}

// get all currency
export interface RequireCurrency {
  currencyID: string;
  abbreviations: string;
}
// get all type container
export interface RequireTypeContainer {
  containerTypeID: string;
  name: string;
  code: string;
}
//----------------------------------------------------------------
// create quotation with pricing
export interface RequireCreateQuotationWithPricing {
  customPricingID: React.Key[];
  effectDated: number;
  validityDate: number;
  profitRateOfGreenPrice: string;
  profitRateOfRedPrice: string;
  profitRateOfYellowPrice: string;
  forNewUser: boolean;
  salesLeadsQuotationRegisters: { partnerID: string }[];
  profitRateOfUnitforFee: { [key: string]: string };
  profitRateOfFee: string;
  status: string;
}
export interface RequireCreateQuotationWithPricingFormValue
  extends Omit<
    RequireCreateQuotationWithPricing,
    'salesLeadsQuotationRegisters'
  > {
  salesLeadsQuotationRegisters: string[];
}
export interface RequirePartnerGroup {
  groupPartnerID: string;
  abbreviations: string;
}

//table partner
export interface RequirePartner {
  partnerID: string;
  name: string;
}
export interface RequestPartnerTable {
  ids: string[];
}
export interface Partner {
  partnerID: string;
  email: string;
  fullName: string;
}
export interface TablePartner extends Omit<Partner, 'partnerID'> {
  key: React.Key;
}
export interface RequireColorRouter {
  colorRouterID: string;
  colorRouterName: string;
  colorRouterDescription: string;
}
