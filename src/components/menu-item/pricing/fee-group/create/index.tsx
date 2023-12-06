import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import FeeGroupForm from '../components/form';
import { FormValues, FeeGroupCreate, FeeGroupEdit, Fee } from '../interface';
import { createFeeGroup, editFeeGroup } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';

const CreateFeeGroup = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: FeeGroupCreate) => {
      return createFeeGroup(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: FeeGroupEdit) => {
      return editFeeGroup(body);
    },
  });

  const handleSubmit = (
    formValues: FormValues,
    id?: string,
    listFee?: Fee[]
  ) => {
    if (id) {
      const _requestData: FeeGroupEdit = {
        feeGroupID: id,
        typeFeeGroupID: formValues.typeFeeGroupID || '',
        feeGroupNo: formValues.feeGroupNo || '',
        feeGroupNameEN: formValues.feeGroupNameEN || '',
        feeGroupNameVN:
          formValues.feeGroupNameVN || formValues.feeGroupNameEN || '',
        public: true,
        statusFeeGroup: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.PRICING_FEE_GROUP))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: FeeGroupCreate = {
        typeFeeGroupID: formValues.typeFeeGroupID || '',
        feeGroupNo: formValues.feeGroupNo || '',
        feeGroupNameEN: formValues.feeGroupNameEN || '',
        feeGroupNameVN:
          formValues.feeGroupNameVN || formValues.feeGroupNameEN || '',
        listFee: listFee || [],
        public: true,
        statusFeeGroup: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.PRICING_FEE_GROUP))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (
    formValues: FormValues,
    id?: string,
    listFee?: Fee[]
  ) => {
    if (id) {
      const _requestData: FeeGroupEdit = {
        feeGroupID: id,
        typeFeeGroupID: formValues.typeFeeGroupID || '',
        feeGroupNo: formValues.feeGroupNo || '',
        feeGroupNameEN: formValues.feeGroupNameEN || '',
        feeGroupNameVN:
          formValues.feeGroupNameVN || formValues.feeGroupNameEN || '',
        public: true,
        statusFeeGroup: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_FEE_GROUP.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: FeeGroupCreate = {
        typeFeeGroupID: formValues.typeFeeGroupID || '',
        feeGroupNo: formValues.feeGroupNo || '',
        feeGroupNameEN: formValues.feeGroupNameEN || '',
        feeGroupNameVN:
          formValues.feeGroupNameVN || formValues.feeGroupNameEN || '',
        listFee: listFee || [],
        public: true,
        statusFeeGroup: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_FEE_GROUP.GET_SEARCH],
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
    <FeeGroupForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateFeeGroup;
