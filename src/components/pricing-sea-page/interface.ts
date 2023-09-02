import { Pagination } from '../commons/table/table-deafault';
import COLORS from '@/constant/color';

export const STATUS_MASTER_COLORS = {
  ACTIVE: COLORS.STATUS_CODE.ACTIVE,
  DEACTIVE: COLORS.STATUS_CODE.DEACTIVE,
};

export const STATUS_MATER_LABELS = {
  ACTIVE: 'ACTIVE',
  DEACTIVE: 'DEACTIVE',
};
//
export interface SeaPricing {
  seaPricingID: string;
  podid: string;
  podName: string;
  polid: string;
  polName: string;
  commodityID: string;
  commodityName: string;
  currencyID: string;
  currencyName: string;
  partnerID: string;
  partnerName: string;
  note: string;
  effectDate: string;
  validity: string;
  freg: string;
  dem: string;
  det: string;
  sto: string;
  lclMin: string;
  lcl: string;
  public: boolean;
  statusSeaPricing: string;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
  seaPricingDetailDTOs: SeaPricingDetailDTOs[];
  seaPricingFeeDTOs: SeaPricingFeeDTOs[];
}

export interface SeaPricingDetailDTOs {
  seaPricingDetailID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  cost: string;
}

export interface SeaPricingFeeDTOs {
  seaPricingFeeID: string;
  feeID: string;
  feeName: string;
  feeNo: string;
  cost: string;
}

export interface SeaPricingTable extends Omit<SeaPricing, 'seaPricingID'> {
  key: string;
  searchAll: string;
}

export interface SeaPricesRequire extends Pagination {
  data: SeaPricing[];
}
//
export interface QueryInputParamType {
  searchAll: string;
}
export interface QuerySelectParamType {
  statusSeaPricing: string[];
}

export interface RequestPricingType
  extends QueryInputParamType,
    QuerySelectParamType {
  paginateRequest: Pagination;
}

export type SelectSearch = {
  [key in keyof QueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface PricingDetailDataBody {
  id: string;
}

export interface FormValues {
  seaPricingID: string;
  podid: string;
  polid: string;
  commodityID: string;
  currencyID: string;
  partnerID: string;
  note: string;
  effectDate: string;
  validity: string;
  freg: string;
  dem: string;
  det: string;
  sto: string;
  lclMin: string;
  lcl: string;
  public: boolean;
  statusSeaPricing: string;
  // seaPricingDetailUpdateRequests: {
  //   containerTypeID: string;
  //   cost: string;
  // }[];
  // seaPricingFeeUpdateRequests: {
  //   feeID: string;
  //   cost: string;
  // }[];
}

export interface SeaPricingDetail extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type SeaPricingCreate = Omit<FormValues, 'seaPricingID'>;

export type SeaPricingEdit = FormValues;

export type SeaPricingDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  internationalCode: string;
  description: string;
}
export interface QuerySelectDraft {
  status: string[];
}
export interface RequestUnitTableDraft
  extends QueryInputDraft,
    QuerySelectDraft {
  paginateRequest: Pagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatusUnit {
  id: string;
  status: string;
}

export interface QueryInputRequest {
  internationalCode: string;
  description: string;
}
export interface RequestUnitTableRequest extends QueryInputRequest {
  paginateRequest: Pagination;
}
