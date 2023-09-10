import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import LocationTypeForm from '../components/form';
import { FormValues, LocationTypeCreate, LocationTypeEdit } from '../interface';
import { createLocationType, editLocationType } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_LOCATION_TYPE } from '@/fetcherAxios/endpoint';

const CreateLocationType = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: LocationTypeCreate) => {
      return createLocationType(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: LocationTypeEdit) => {
      return editLocationType(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: LocationTypeEdit = {
        typeLocationID: id,
        typeLocationNameEN: formValues.typeLocationNameEN || '',
        typeLocationNameVN:
          formValues.typeLocationNameVN || formValues.typeLocationNameEN || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusTypeLocation: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_OF_LOCATION))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: LocationTypeCreate = {
        typeLocationNameEN: formValues.typeLocationNameEN || '',
        typeLocationNameVN:
          formValues.typeLocationNameVN || formValues.typeLocationNameEN || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusTypeLocation: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_OF_LOCATION))
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
      const _requestData: LocationTypeEdit = {
        typeLocationID: id,
        typeLocationNameEN: formValues.typeLocationNameEN || '',
        typeLocationNameVN:
          formValues.typeLocationNameVN || formValues.typeLocationNameEN || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusTypeLocation: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_LOCATION_TYPE.GET_DRAFT],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: LocationTypeCreate = {
        typeLocationNameEN: formValues.typeLocationNameEN || '',
        typeLocationNameVN:
          formValues.typeLocationNameVN || formValues.typeLocationNameEN || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusTypeLocation: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_LOCATION_TYPE.GET_DRAFT],
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
    <LocationTypeForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateLocationType;
