import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import TypeFeeGroupForm from '../components/form';
import { FormValues, TypeFeeGroupCreate, TypeFeeGroupEdit } from '../interface';
import { createTypeFeeGroup, editTypeFeeGroup } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_TYPE_FEE_GROUP } from '@/fetcherAxios/endpoint';

const CreateTypeFeeGroup = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: TypeFeeGroupCreate) => {
      return createTypeFeeGroup(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: TypeFeeGroupEdit) => {
      return editTypeFeeGroup(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: TypeFeeGroupEdit = {
        typeFeeGroupID: id,
        typeFeeGroupNo: formValues.typeFeeGroupNo || '',
        typeFeeGroupNameEN: formValues.typeFeeGroupNameEN || '',
        typeFeeGroupNameVN:
          formValues.typeFeeGroupNameVN || formValues.typeFeeGroupNameEN || '',
        statusTypeFeeGroup: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.TYPE_FEE_GROUP))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: TypeFeeGroupCreate = {
        typeFeeGroupNo: formValues.typeFeeGroupNo || '',
        typeFeeGroupNameEN: formValues.typeFeeGroupNameEN || '',
        typeFeeGroupNameVN:
          formValues.typeFeeGroupNameVN || formValues.typeFeeGroupNameEN || '',
        statusTypeFeeGroup: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.TYPE_FEE_GROUP))
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
      const _requestData: TypeFeeGroupEdit = {
        typeFeeGroupID: id,
        typeFeeGroupNo: formValues.typeFeeGroupNo || '',
        typeFeeGroupNameEN: formValues.typeFeeGroupNameEN || '',
        typeFeeGroupNameVN:
          formValues.typeFeeGroupNameVN || formValues.typeFeeGroupNameEN || '',
        statusTypeFeeGroup: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TYPE_FEE_GROUP.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: TypeFeeGroupCreate = {
        typeFeeGroupNo: formValues.typeFeeGroupNo || '',
        typeFeeGroupNameEN: formValues.typeFeeGroupNameEN || '',
        typeFeeGroupNameVN:
          formValues.typeFeeGroupNameVN || formValues.typeFeeGroupNameEN || '',
        statusTypeFeeGroup: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TYPE_FEE_GROUP.GET_SEARCH],
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
    <TypeFeeGroupForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateTypeFeeGroup;
