import { IPagination } from '../../../../commons/table/table-default';

export interface ITypeDeclaration {
  typeDelaracrionID: string;
  transactionTypeID: string;
  transactionTypeName: string;
  typeDelaracrionCode: string;
  typeDelaracrionName: string;
  description: string;
  statusTypeDelaracrion: string;
  public: boolean;
  insertedByUser: string;
  dateInserted: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export interface ITypeDeclarationTable
  extends Omit<ITypeDeclaration, 'typeDelaracrionID'> {
  key: string;
  searchAll: string;
}

export interface ITypeDeclarationRequire extends IPagination {
  data: ITypeDeclaration[];
}
//
export interface ITypeQueryInputParamType {
  searchAll: string;
  typeDelaracrionCode: string;
  typeDelaracrionName: string;
  description: string;
}
export interface ITypeQuerySelectParamType {
  transactionTypeID: string;
  statusTypeDelaracrion: string[];
}

export interface IRequestTypeDeclarationType
  extends ITypeQueryInputParamType,
    ITypeQuerySelectParamType {
  paginateRequest: IPagination;
}

export type ISelectSearch = {
  [key in keyof ITypeQueryInputParamType]: {
    label: string;
    value: string;
  };
};

export interface ITypeDeclarationDetailDataBody {
  id: string;
}

export interface IFormValues {
  typeDelaracrionID: string;
  transactionTypeID: string;
  typeDelaracrionCode: string;
  typeDelaracrionNameEN: string;
  typeDelaracrionNameVN: string;
  descriptionEN: string;
  descriptionVN: string;
  statusTypeDelaracrion: string;
}

export interface ITypeDeclarationDetailType extends IFormValues {
  public: true;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
}

export type ITypeDeclarationCreate = Omit<IFormValues, 'typeDelaracrionID'>;

export type ITypeDeclarationEdit = IFormValues;

export type ITypeDeclarationDelete = {
  ids: React.Key[];
};

//----------------------------------------------------------------
export interface IQueryInputDraft {
  typeDelaracrionCode: string;
  typeDelaracrionName: string;
  description: string;
}
export interface IQuerySelectDraft {
  transactionTypeID: string;
  status: string[];
}
export interface IRequestDeclarationTableDraft
  extends IQueryInputDraft,
    IQuerySelectDraft {
  paginateRequest: IPagination;
}

export type ISelectDratSearch = {
  [key in keyof IQueryInputDraft]: {
    label: string;
    value: string;
  };
};

//----------------------------------------------------------------

export interface IUpdateStatusDeclaration {
  id: React.Key[];
  status: string;
}

export interface IQueryInputRequest {
  searchAll: string;
  transactionTypeID: string;
  typeDelaracrionCode: string;
  typeDelaracrionName: string;
  description: string;
}

export interface IRequestDeclarationTableRequest extends IQueryInputRequest {
  paginateRequest: IPagination;
}
// export table
export interface IRequestExportData {
  ids: React.Key[];
  status: string[];
}
export interface ITypeTransaction {
  transactionTypeID: string;
  transactionTypeName: string;
}
