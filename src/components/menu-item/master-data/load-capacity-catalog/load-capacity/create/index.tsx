import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import LoadCapacityForm from '../components/form';
import {
  IFormValues,
  ICreateLoadCapacity,
  IEditLoadCapacity,
} from '../interface';
import { createLoadCapacity, editLoadCapacity } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_LOAD_CAPACITY } from '@/fetcherAxios/endpoint';

const CreateLoadCapacity = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ICreateLoadCapacity) => {
      return createLoadCapacity(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: IEditLoadCapacity) => {
      return editLoadCapacity(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: IEditLoadCapacity = {
        loadCapacityID: id,
        code: formValues.code || '',
        name: formValues.name || '',
        typeLoadCapacityID: formValues.typeLoadCapacityID || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusLoadCapacity: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.LOAD_CAPACITY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ICreateLoadCapacity = {
        code: formValues.code || '',
        name: formValues.name || '',
        typeLoadCapacityID: formValues.typeLoadCapacityID || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusLoadCapacity: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.LOAD_CAPACITY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: IEditLoadCapacity = {
        loadCapacityID: id,
        code: formValues.code || '',
        name: formValues.name || '',
        typeLoadCapacityID: formValues.typeLoadCapacityID || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusLoadCapacity: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_LOAD_CAPACITY.GET_DRAFT],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ICreateLoadCapacity = {
        code: formValues.code || '',
        name: formValues.name || '',
        typeLoadCapacityID: formValues.typeLoadCapacityID || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusLoadCapacity: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_LOAD_CAPACITY.GET_DRAFT],
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
    <LoadCapacityForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateLoadCapacity;
