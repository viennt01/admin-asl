import { IPagination } from '../../../commons/table/table-default';
export interface ContainerType {
  containerTypeID: string;
  containerTypeCode: string;
  name: string;
  details: string;
  teus: string;
  statusContainerType: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  isDelete: boolean;
  dateDeleted: string;
  deleteByUser: string;
}

export interface ContainerTypeTable
  extends Omit<ContainerType, 'containerTypeID'> {
  key: string;
  searchAll: string;
}

export interface ContainerTypesRequire extends IPagination {
  data: ContainerType[];
}

export interface QueryInputParamType {
  searchAll: string;
  containerTypeCode: string;
  name: string;
  details: string;
  teus: string;
}

export interface QuerySelectParamType {
  statusContainerType: string[];
}

export interface RequestTypeContainerType
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

export interface ContainerTypeDetailDataBody {
  id: string;
}

export interface FormValues {
  containerTypeID: string;
  containerTypeCode: string;
  name: string;
  detailsEN: string;
  detailsVN: string;
  teus: string;
  statusContainerType: string;
  public: boolean;
}

export interface ContainerTypeDetailType extends FormValues {
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export type ContainerTypeCreate = Omit<FormValues, 'containerTypeID'>;

export type ContainerTypeEdit = FormValues;

export type ContainerTypeDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface QueryInputDraft {
  containerTypeCode: string;
  name: string;
  details: string;
  teus: string;
}

export interface QuerySelectDraft {
  status: string[];
}

export interface RequestContainerTypeTableDraft
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

export interface UpdateStatusContainerType {
  id: React.Key[];
  status: string;
}

export interface QueryInputRequest {
  containerTypeCode: string;
  name: string;
  details: string;
  teus: string;
}

export interface RequestContainerTypeTableRequest extends QueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface RequestExportData {
  ids: React.Key[];
  status: string[];
}
