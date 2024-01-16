import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import SaleActivityForm from '../components/form';
import {
  IFormValues,
  ISaleActivityCreate,
  ISaleActivityEdit,
  STATUS,
} from '../interface';
import { createUnit, editUnit } from '../fetcher';
import { API_PARTNER } from '@/fetcherAxios/endpoint';

const CreateSaleActivity = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ISaleActivityCreate) => {
      return createUnit(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ISaleActivityEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: ISaleActivityEdit = {
        saleActivityID: id,
        saleActivityTypeID: formValues.saleActivityTypeID || '',
        partnerID: formValues.partnerID || '',
        timeActivitySaleActivity:
          formValues.timeActivitySaleActivity?.valueOf() || 1,
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusSaleActivity: STATUS.COMING,
        listUserID: formValues.listUserID || [],
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.SALE_ACTIVITY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ISaleActivityCreate = {
        saleActivityTypeID: formValues.saleActivityTypeID || '',
        partnerID: formValues.partnerID || '',
        timeActivitySaleActivity:
          formValues.timeActivitySaleActivity?.valueOf() || 1,
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusSaleActivity: STATUS.COMING,
        listUserID: formValues.listUserID || [],
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.SALE_ACTIVITY))
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
      const _requestData: ISaleActivityEdit = {
        saleActivityID: id,
        saleActivityTypeID: formValues.saleActivityTypeID || '',
        partnerID: formValues.partnerID || '',
        timeActivitySaleActivity:
          formValues.timeActivitySaleActivity?.valueOf() || 1,
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusSaleActivity: STATUS.COMING,
        listUserID: formValues.listUserID || [],
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_PARTNER.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ISaleActivityCreate = {
        saleActivityTypeID: formValues.saleActivityTypeID || '',
        partnerID: formValues.partnerID || '',
        timeActivitySaleActivity:
          formValues.timeActivitySaleActivity?.valueOf() || 1,
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusSaleActivity: STATUS.COMING,
        listUserID: formValues.listUserID || [],
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_PARTNER.GET_SEARCH],
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
    <SaleActivityForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateSaleActivity;
