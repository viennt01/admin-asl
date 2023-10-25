import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import LoadCapacityTypeForm from '../components/form';
import {
  FormValues,
  ILoadCapacityTypeCreate,
  ILoadCapacityTypeEdit,
} from '../interface';
import { createLoadCapacityType, editLoadCapacityType } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_LOAD_CAPACITY_TYPE } from '@/fetcherAxios/endpoint';

const CreateLoadCapacityType = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ILoadCapacityTypeCreate) => {
      return createLoadCapacityType(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ILoadCapacityTypeEdit) => {
      return editLoadCapacityType(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: ILoadCapacityTypeEdit = {
        typeLoadCapacityID: id,
        typeLoadCapacityCode: formValues.typeLoadCapacityCode || '',
        typeLoadCapacityNameEN: formValues.typeLoadCapacityNameEN || '',
        typeLoadCapacityNameVN:
          formValues.typeLoadCapacityNameVN ||
          formValues.typeLoadCapacityNameEN ||
          '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        public: true,
        statusTypeLoadCapacity: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_OF_LOAD_CAPACITY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ILoadCapacityTypeCreate = {
        typeLoadCapacityCode: formValues.typeLoadCapacityCode || '',
        typeLoadCapacityNameEN: formValues.typeLoadCapacityNameEN || '',
        typeLoadCapacityNameVN:
          formValues.typeLoadCapacityNameVN ||
          formValues.typeLoadCapacityNameEN ||
          '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        public: true,
        statusTypeLoadCapacity: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_OF_LOAD_CAPACITY))
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
      const _requestData: ILoadCapacityTypeEdit = {
        typeLoadCapacityID: id,
        typeLoadCapacityCode: formValues.typeLoadCapacityCode || '',
        typeLoadCapacityNameEN: formValues.typeLoadCapacityNameEN || '',
        typeLoadCapacityNameVN:
          formValues.typeLoadCapacityNameVN ||
          formValues.typeLoadCapacityNameEN ||
          '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        public: true,
        statusTypeLoadCapacity: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_LOAD_CAPACITY_TYPE.GET_DRAFT],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ILoadCapacityTypeCreate = {
        typeLoadCapacityCode: formValues.typeLoadCapacityCode || '',
        typeLoadCapacityNameEN: formValues.typeLoadCapacityNameEN || '',
        typeLoadCapacityNameVN:
          formValues.typeLoadCapacityNameVN ||
          formValues.typeLoadCapacityNameEN ||
          '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        public: true,
        statusTypeLoadCapacity: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_LOAD_CAPACITY_TYPE.GET_DRAFT],
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
    <LoadCapacityTypeForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateLoadCapacityType;
