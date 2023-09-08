import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import TypeOfContainerTypeForm from '../components/form';
import {
  FormValues,
  ContainerTypeCreate,
  ContainerTypeEdit,
} from '../interface';
import { createContainerType, editContainerType } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';

const CreateTypeOfContainer = () => {
  const queryClient = useQueryClient();

  const createContainerTypeMutation = useMutation({
    mutationFn: (body: ContainerTypeCreate) => {
      return createContainerType(body);
    },
  });

  const updateContainerTypeMutation = useMutation({
    mutationFn: (body: ContainerTypeEdit) => {
      return editContainerType(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: ContainerTypeEdit = {
        containerTypeID: id,
        containerTypeCode: formValues.containerTypeCode,
        name: formValues.name,
        detailsEN: formValues.detailsEN,
        detailsVN: formValues.detailsVN,
        teus: formValues.teus,
        statusContainerType: STATUS_ALL_LABELS.REQUEST,
      };
      updateContainerTypeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPES_OF_CONTAINER))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ContainerTypeCreate = {
        containerTypeCode: formValues.containerTypeCode,
        name: formValues.name,
        detailsEN: formValues.detailsEN,
        detailsVN: formValues.detailsVN,
        teus: formValues.teus,
        statusContainerType: STATUS_ALL_LABELS.REQUEST,
      };
      createContainerTypeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPES_OF_CONTAINER))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: ContainerTypeEdit = {
        containerTypeID: id,
        containerTypeCode: formValues.containerTypeCode,
        name: formValues.name,
        detailsEN: formValues.detailsEN,
        detailsVN: formValues.detailsVN,
        teus: formValues.teus,
        statusContainerType: STATUS_ALL_LABELS.DRAFT,
      };
      updateContainerTypeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_CONTAINER_TYPE.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ContainerTypeCreate = {
        containerTypeCode: formValues.containerTypeCode || '',
        name: formValues.name || '',
        detailsEN: formValues.detailsEN || '',
        detailsVN: formValues.detailsVN || '',
        teus: formValues.teus || '',
        statusContainerType: STATUS_ALL_LABELS.DRAFT,
      };
      createContainerTypeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_CONTAINER_TYPE.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  return (
    <TypeOfContainerTypeForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createContainerTypeMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateTypeOfContainer;
