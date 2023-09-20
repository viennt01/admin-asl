import {
  ResponseWithPayload,
  downloadFile,
  exportFile,
  post,
  uploadFile,
} from '@/fetcherAxios';
import {
  ContainerTypesRequire,
  RequestTypeContainerType,
  RequestContainerTypeTableDraft,
  ContainerTypeCreate,
  ContainerTypeDelete,
  ContainerTypeDetailDataBody,
  ContainerTypeDetailType,
  ContainerTypeEdit,
  UpdateStatusContainerType,
  RequestContainerTypeTableRequest,
  RequestExportData,
} from './interface';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';

export const getTypeContainersSearch = (data: RequestTypeContainerType) => {
  return post<
    RequestTypeContainerType,
    ResponseWithPayload<ContainerTypesRequire>
  >({
    data,
  })(API_CONTAINER_TYPE.GET_SEARCH);
};

export const getContainerTypeDetail = (id: string) => {
  return post<
    ContainerTypeDetailDataBody,
    ResponseWithPayload<ContainerTypeDetailType>
  >({
    data: {
      id,
    },
  })(API_CONTAINER_TYPE.GET_DETAIL);
};

export const createContainerType = (data: ContainerTypeCreate) => {
  return post<ContainerTypeCreate, ResponseWithPayload<ContainerTypeCreate>>({
    data,
  })(API_CONTAINER_TYPE.CREATE);
};

export const editContainerType = (data: ContainerTypeEdit) => {
  return post<ContainerTypeEdit, ResponseWithPayload<ContainerTypeEdit>>({
    data,
  })(API_CONTAINER_TYPE.EDIT);
};

export const deleteContainerType = (data: React.Key[]) => {
  return post<ContainerTypeDelete, ResponseWithPayload<ContainerTypeDelete>>({
    data: {
      ids: data,
    },
  })(API_CONTAINER_TYPE.DELETE);
};

export const getDartTable = (data: RequestContainerTypeTableDraft) => {
  return post<
    RequestContainerTypeTableDraft,
    ResponseWithPayload<ContainerTypesRequire>
  >({
    data,
  })(API_CONTAINER_TYPE.GET_DRAFT);
};

//----------------------------------------------------------------

export const updateStatus = (data: UpdateStatusContainerType) => {
  return post<
    UpdateStatusContainerType,
    ResponseWithPayload<UpdateStatusContainerType>
  >({
    data,
  })(API_CONTAINER_TYPE.UPDATE_STATUS);
};

export const getTable = (data: RequestContainerTypeTableRequest) => {
  return post<
    RequestContainerTypeTableRequest,
    ResponseWithPayload<ContainerTypesRequire>
  >({
    data,
  })(API_CONTAINER_TYPE.GET_REQUEST);
};
//----------------------------------------------------------------
export const importDataTable = (data: FormData) => {
  return uploadFile({ data, timeout: 10000 })(API_CONTAINER_TYPE.IMPORT);
};
export const downloadExampleFile = () => {
  return downloadFile<BlobPart>({})(API_CONTAINER_TYPE.DOWNLOAD_EXAMPLE_FILE);
};
export const exportTableFile = (data: RequestExportData) => {
  return exportFile<RequestExportData, BlobPart>({ data })(
    API_CONTAINER_TYPE.EXPORT
  );
};
