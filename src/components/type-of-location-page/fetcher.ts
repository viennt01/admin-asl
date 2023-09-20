import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  LocationTypeRequire,
  RequestLocationTypeType,
  RequestLocationTypeTableDraft,
  LocationTypeCreate,
  LocationTypeDelete,
  LocationTypeDetailDataBody,
  LocationTypeDetailType,
  LocationTypeEdit,
  UpdateStatusLocationType,
  RequestLocationTypeTableRequest,
  RequestExportData,
} from './interface';
import { API_LOCATION_TYPE } from '@/fetcherAxios/endpoint';

export const getLocationTypeSearch = (data: RequestLocationTypeType) => {
  return post<
    RequestLocationTypeType,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION_TYPE.GET_SEARCH);
};

export const geLocationTypeDetail = (id: string) => {
  return post<
    LocationTypeDetailDataBody,
    ResponseWithPayload<LocationTypeDetailType>
  >({
    data: {
      id,
    },
  })(API_LOCATION_TYPE.GET_DETAIL);
};

export const createLocationType = (data: LocationTypeCreate) => {
  return post<LocationTypeCreate, ResponseWithPayload<LocationTypeCreate>>({
    data,
  })(API_LOCATION_TYPE.CREATE);
};

export const editLocationType = (data: LocationTypeEdit) => {
  return post<LocationTypeEdit, ResponseWithPayload<LocationTypeEdit>>({
    data,
  })(API_LOCATION_TYPE.EDIT);
};

export const deleteLocationType = (data: React.Key[]) => {
  return post<LocationTypeDelete, ResponseWithPayload<LocationTypeDelete>>({
    data: {
      ids: data,
    },
  })(API_LOCATION_TYPE.DELETE);
};

export const getDartTable = (data: RequestLocationTypeTableDraft) => {
  return post<
    RequestLocationTypeTableDraft,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION_TYPE.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusLocationType) => {
  return post<
    UpdateStatusLocationType,
    ResponseWithPayload<UpdateStatusLocationType>
  >({
    data,
  })(API_LOCATION_TYPE.UPDATE_STATUS);
};

export const getTableRequire = (data: RequestLocationTypeTableRequest) => {
  return post<
    RequestLocationTypeTableRequest,
    ResponseWithPayload<LocationTypeRequire>
  >({
    data,
  })(API_LOCATION_TYPE.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_LOCATION_TYPE.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_LOCATION_TYPE.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_LOCATION_TYPE.EXPORT
  );
};
