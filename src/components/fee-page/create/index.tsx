import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import FeeForm from '../components/form';
import { FormValues, FeeCreate, FeeEdit } from '../interface';
import { createFee, editFee } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_FEE } from '@/fetcherAxios/endpoint';

const CreateFee = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: FeeCreate) => {
      return createFee(body);
    },
  });

  const updateFeeMutation = useMutation({
    mutationFn: (body: FeeEdit) => {
      return editFee(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: FeeEdit = {
        feeID: id,
        feeNo: formValues.feeNo || '',
        feeName: formValues.feeName || '',
        vatFee: formValues.vatFee || '',
        statusFee: STATUS_ALL_LABELS.REQUEST,
      };
      updateFeeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.FEE))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: FeeCreate = {
        feeNo: formValues.feeNo || '',
        feeName: formValues.feeName || '',
        vatFee: formValues.vatFee || '',
        statusFee: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.FEE))
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
      const _requestData: FeeEdit = {
        feeID: id,
        feeNo: formValues.feeNo || '',
        feeName: formValues.feeName || '',
        vatFee: formValues.vatFee || '',
        statusFee: STATUS_ALL_LABELS.DRAFT,
      };
      updateFeeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_FEE.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: FeeCreate = {
        feeNo: formValues.feeNo || '',
        feeName: formValues.feeName || '',
        vatFee: formValues.vatFee || '',
        statusFee: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_FEE.GET_SEARCH],
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
    <FeeForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateFee;
