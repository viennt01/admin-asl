import { IPagination } from '../../../commons/table/table-default';

export interface Unit {
  unitID: string;
  internationalCode: string;
  description: string;
  statusUnit: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface UnitTable extends Omit<Unit, 'unitID'> {
  key: string;
  searchAll: string;
}

export interface UnitsRequire extends IPagination {
  data: Unit[];
}
//
export interface QueryInputParamType {
  searchAll: string;
  internationalCode: string;
  description: string;
}
export interface QuerySelectParamType {
  statusUnit: string[];
}

export interface RequestUnitType
  extends QueryInputParamType,
    QuerySelectParamType {
  paginateRequest: IPagination;
}

export type SelectSearch = {
  [key in keyof QueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface UnitDetailDataBody {
  id: string;
}

export interface FormValues {
  unitID: string;
  internationalCode: string;
  descriptionVN: string;
  descriptionEN: string;
  statusUnit: string;
}

export interface UnitDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type UnitCreate = Omit<FormValues, 'unitID'>;

export type UnitEdit = FormValues;

export type UnitDelete = {
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
  paginateRequest: IPagination;
}

export type SelectDratSearch = {
  [key in keyof QueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface UpdateStatusUnit {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  internationalCode: string;
  description: string;
}
export interface RequestUnitTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
