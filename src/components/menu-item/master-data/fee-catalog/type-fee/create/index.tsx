import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import TypeFeeForm from '../components/form';
import { FormValues, TypeFeeCreate, TypeFeeEdit } from '../interface';
import { createTypeFee, editTypeFee } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_TYPE_FEE } from '@/fetcherAxios/endpoint';

const CreateTypeFee = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: TypeFeeCreate) => {
      return createTypeFee(body);
    },
  });

  const updateFeeMutation = useMutation({
    mutationFn: (body: TypeFeeEdit) => {
      return editTypeFee(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: TypeFeeEdit = {
        typeFeeID: id,
        typeFeeNo: formValues.typeFeeNo || '',
        typeFeeNameEN: formValues.typeFeeNameEN || '',
        typeFeeNameVN:
          formValues.typeFeeNameVN || formValues.typeFeeNameEN || '',
        public: true,
        statusTypeFee: STATUS_ALL_LABELS.REQUEST,
      };
      updateFeeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.TYPE_FEE))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: TypeFeeCreate = {
        typeFeeNo: formValues.typeFeeNo || '',
        typeFeeNameEN: formValues.typeFeeNameEN || '',
        typeFeeNameVN:
          formValues.typeFeeNameVN || formValues.typeFeeNameEN || '',
        public: true,
        statusTypeFee: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.TYPE_FEE))
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
      const _requestData: TypeFeeEdit = {
        typeFeeID: id,
        typeFeeNo: formValues.typeFeeNo || '',
        typeFeeNameEN: formValues.typeFeeNameEN || '',
        typeFeeNameVN:
          formValues.typeFeeNameVN || formValues.typeFeeNameEN || '',
        public: true,
        statusTypeFee: STATUS_ALL_LABELS.DRAFT,
      };
      updateFeeMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TYPE_FEE.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: TypeFeeCreate = {
        typeFeeNo: formValues.typeFeeNo || '',
        typeFeeNameEN: formValues.typeFeeNameEN || '',
        typeFeeNameVN:
          formValues.typeFeeNameVN || formValues.typeFeeNameEN || '',
        public: true,
        statusTypeFee: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TYPE_FEE.GET_SEARCH],
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
    <TypeFeeForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateTypeFee;
