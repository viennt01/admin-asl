import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import CommodityForm from '../components/form';
import { FormValues, CreateCommodity, EditCommodity } from '../interface';
import { createCommodity, editCommodity } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_COMMODITY } from '@/fetcherAxios/endpoint';

const CommodityPage = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: CreateCommodity) => {
      return createCommodity(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: EditCommodity) => {
      return editCommodity(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    console.log(formValues);

    if (id) {
      const _requestData: EditCommodity = {
        commodityID: id,
        commodityNameEN: formValues.commodityNameEN || '',
        commodityNameVN:
          formValues.commodityNameVN || formValues.commodityNameEN || '',
        statusCommodity: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.COMMODITY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: CreateCommodity = {
        commodityNameEN: formValues.commodityNameEN || '',
        commodityNameVN:
          formValues.commodityNameVN || formValues.commodityNameEN || '',
        statusCommodity: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.COMMODITY))
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
      const _requestData: EditCommodity = {
        commodityID: id,
        commodityNameEN: formValues.commodityNameEN || '',
        commodityNameVN:
          formValues.commodityNameVN || formValues.commodityNameEN || '',
        statusCommodity: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_COMMODITY.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: CreateCommodity = {
        commodityNameEN: formValues.commodityNameEN || '',
        commodityNameVN:
          formValues.commodityNameVN || formValues.commodityNameEN || '',
        statusCommodity: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_COMMODITY.GET_SEARCH],
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
    <CommodityForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CommodityPage;
