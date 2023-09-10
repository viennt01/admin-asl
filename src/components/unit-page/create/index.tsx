import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import { FormValues, UnitCreate, UnitEdit } from '../interface';
import { createUnit, editUnit } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_UNIT } from '@/fetcherAxios/endpoint';

const CreateUnit = () => {
  const queryClient = useQueryClient();

  const createPortMutation = useMutation({
    mutationFn: (body: UnitCreate) => {
      return createUnit(body);
    },
  });

  const updateUnitMutation = useMutation({
    mutationFn: (body: UnitEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: UnitEdit = {
        unitID: id,
        internationalCode: formValues.internationalCode,
        descriptionVN: formValues.descriptionVN,
        descriptionEN: formValues.descriptionEN,
        statusUnit: STATUS_ALL_LABELS.REQUEST,
      };
      updateUnitMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: UnitCreate = {
        internationalCode: formValues.internationalCode,
        descriptionVN: formValues.descriptionVN,
        descriptionEN: formValues.descriptionEN,
        statusUnit: STATUS_ALL_LABELS.REQUEST,
      };
      createPortMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
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
      const _requestData: UnitEdit = {
        unitID: id,
        internationalCode: formValues.internationalCode,
        descriptionVN: formValues.descriptionVN,
        descriptionEN: formValues.descriptionEN,
        statusUnit: STATUS_ALL_LABELS.DRAFT,
      };
      updateUnitMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_UNIT.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: UnitCreate = {
        internationalCode: formValues.internationalCode || '',
        descriptionVN: formValues.descriptionVN || '',
        descriptionEN: formValues.descriptionEN || '',
        statusUnit: STATUS_ALL_LABELS.DRAFT,
      };
      createPortMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_UNIT.GET_SEARCH],
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
    <UnitForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={
        createPortMutation.isLoading || updateUnitMutation.isLoading
      }
      checkRow={false}
      useDraft
    />
  );
};

export default CreateUnit;
