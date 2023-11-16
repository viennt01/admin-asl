import { Dayjs } from 'dayjs';
import { IPagination } from '../../../commons/table/table-default';

export interface ITruckingQuotation {
  truckingPricingID: string;
  pickupID: string;
  pickupName: string;
  deliveryID: string;
  deliveryName: string;
  emtyPickupID: string;
  emtyPickupName: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyAbbreviations: string;
  feeGroupID: string;
  vendor: string;
  note: string;
  effectDated: string;
  validityDate: string;
  freqDate: string;
  lclMinTruckingPricing: string;
  lclTruckingPricing: string;
  public: boolean;
  statusTruckingPricing: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  truckingPricingDetailByContainerTypeDTOs: { [key: string]: string };
  truckingPricingDetailByLoadCapacityDTOs: { [key: string]: string };
}

export interface IDetailDTOs {
  [key: string]: string;
}

export interface ISeaQuotationTable
  extends Omit<ITruckingQuotation, 'truckingPricingID'> {
  key: string;
  searchAll: string;
}

export interface ITruckingQuotationRequire extends IPagination {
  data: ITruckingQuotation[];
}
//
export interface IQueryInputParamType {
  searchAll: string;
}
export interface IQuerySelectParamType {
  statusTruckingQuotation: string[];
}

export interface RequestSeaQuotation
  extends IQueryInputParamType,
    IQuerySelectParamType {
  paginateRequest: IPagination;
}

export type ISelectSearch = {
  [key in keyof IQueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface ISeaQuotationDetailDataBody {
  id: string;
}

export interface IFormValues {
  truckingQuotationID: string;
  truckingPricingID: string;
  truckingQuotationNo: string;
  pickupID: string;
  deliveryID: string;
  emtyPickupID: string;
  commodityID: string;
  currencyID: string;
  vendor: string;
  note: string;
  dateEffect: Dayjs;
  validityDate: Dayjs;
  freqDate: string;
  lclMinTruckingQuotation: string;
  lclTruckingQuotation: string;
  public: boolean;
  statusTruckingQuotation: string;
  truckingQuotationDetailByContainerTypeDTOs: IContainerDTOFormValue[];
  truckingQuotationDetailByLoadCapacityDTOs: ILoadCapacityDTOFormValue[];
  truckingQuotaionFeeGroupDTOs: ITruckQuotationFeeFormValue[];
  salesLeadsTruckingQuotationDTOs: string[];
  truckingQuotaionGroupPartnerDTOs: string[];
}

export interface ITruckingPricingDetailType
  extends Omit<
    IFormValues,
    'salesLeadsTruckingQuotationDTOs' | 'truckingQuotaionGroupPartnerDTOs'
  > {
  pickupName: string;
  deliveryName: string;
  emtyPickupName: string;
  commodityName: string;
  currencyAbbreviations: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  salesLeadsTruckingQuotationDTOs: ISalesLeadsSeaQuotationDTOs[];
  truckingQuotaionGroupPartnerDTOs: ITruckQuotaionGroupPartnerDTOs[];
}

export interface ISalesLeadsSeaQuotationDTOs {
  salesLeadsTruckingQuotationID?: string;
  partnerID: string;
}
export interface IEditSalesLeadsSeaQuotationDTOs
  extends ISalesLeadsSeaQuotationDTOs {
  isDelete: boolean;
}
export interface ITruckQuotaionGroupPartnerDTOs {
  truckingQuotationGroupPartnerID: string;
  groupPartnerID: string;
}

export interface IContainerDTOFormValue {
  truckingQuotationDetailByContainerTypeID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

export type ISeaQuotationDetailDTOsCreate = Omit<
  IContainerDTOFormValue,
  | 'truckingQuotationDetailByContainerTypeID'
  | 'containerTypeCode'
  | 'containerTypeName'
  | 'currencyID'
  | 'currencyName'
  | 'price'
> & {
  priceQuotationDetail: string;
};

export type ISeaQuotationDetailDTOsUpdate = Omit<
  IContainerDTOFormValue,
  'containerTypeCode' | 'containerTypeName' | 'currencyName' | 'currencyID'
> & {
  isDelete?: boolean;
};

export interface ILoadCapacityDTOFormValue {
  truckingQuotationDetailByLoadCapacityID: string;
  loadCapacityID: string;
  loadCapacityCode: string;
  loadCapacityName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

export type ILoadCapacityDetailDTOsCreate = Omit<
  ILoadCapacityDTOFormValue,
  | 'truckingQuotationDetailByLoadCapacityID'
  | 'loadCapacityCode'
  | 'loadCapacityName'
  | 'currencyID'
  | 'currencyName'
  | 'price'
> & {
  pricePricingDetail: string;
};

export type ILoadCapacityDetailDTOsUpdate = Omit<
  ILoadCapacityDTOFormValue,
  'loadCapacityCode' | 'loadCapacityName' | 'currencyName' | 'currencyID'
> & {
  isDelete?: boolean;
};

export interface ITruckQuotationFeeFormValue {
  feeGroupID: string;
  feeGroupName: string;
}

export interface ISeaQuotationFeeDTOs {
  seaQuotationFeeID: string;
  feeGroupDetailID: string;
  currencyID: string;
  feeName: string;
  unitID: string;
  priceFee: string;
  vatFee: string;
  unitInternationalCode: string;
  currencyName: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type ITruckQuotationCreate = Omit<
  IFormValues,
  | 'truckingQuotationID'
  | 'truckingPricingID'
  | 'truckingQuotationNo'
  | 'dateEffect'
  | 'validityDate'
  | 'vendor'
  | 'truckingQuotationDetailByContainerTypeDTOs'
  | 'truckingQuotationDetailByLoadCapacityDTOs'
  | 'truckingQuotaionFeeGroupDTOs'
  | 'salesLeadsTruckingQuotationDTOs'
  | 'truckingQuotaionGroupPartnerDTOs'
> & {
  effectDated: number;
  validityDate: number;
  partnerID: string;
  truckingQuotationDetailRegisterRequests: ISeaQuotationDetailDTOsCreate[];
  truckingLoadCapacityDetailRegisterRequests: ILoadCapacityDetailDTOsCreate[];
  truckingQuotationFeeGroupRegisterRequests: { feeGroupID: string }[];
  salesLeadsQuotationRegisters: { partnerID: string }[];
  truckingQuotationGroupPartnerRegisterRequests: { groupPartnerID: string }[];
};

export type ITruckQuotationEdit = Omit<
  IFormValues,
  | 'truckingPricingID'
  | 'truckingQuotationNo'
  | 'dateEffect'
  | 'validityDate'
  | 'vendor'
  | 'truckingQuotationDetailByContainerTypeDTOs'
  | 'truckingQuotationDetailByLoadCapacityDTOs'
  | 'truckingQuotaionFeeGroupDTOs'
  | 'salesLeadsTruckingQuotationDTOs'
  | 'truckingQuotaionGroupPartnerDTOs'
> & {
  effectDated: number;
  validityDate: number;
  partnerID: string;
  seaQuotationDetailUpdateRequests: ISeaQuotationDetailDTOsUpdate[];
  salesLeadsSeaQuotationUpdateRequests: IEditSalesLeadsSeaQuotationDTOs[];
};
export type SeaPricingDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface IQueryInputDraft {
  searchAll: string;
}
export interface IQuerySelectDraft {
  statusTruckingQuotation: string[];
}
export interface RequestTableDraft extends IQueryInputDraft, IQuerySelectDraft {
  paginateRequest: IPagination;
}

export type ISelectDratSearch = {
  [key in keyof IQueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface IUpdateStatus {
  id: React.Key[];
  status: string;
}
export interface IQueryInputRequest {
  searchAll: string;
  statusTruckingQuotation: string[];
}
// export interface QuerySelectRequest {
//   status: string;
// }
export interface RequestTableRequest extends IQueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface IRequestExportData {
  ids: React.Key[];
  status: string[];
}
//----------------------------------------------------------------
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
