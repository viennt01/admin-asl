import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import TypeSaleActivityForm from '../components/form';
import {
  IFormValues,
  ITypeSaleActivityCreate,
  ITypeSaleActivityEdit,
  TYPE_TABS,
} from '../interface';
import { createDeclaration, editDeclaration } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';

const CreateTypeSaleActivity = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ITypeSaleActivityCreate) => {
      return createDeclaration(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ITypeSaleActivityEdit) => {
      return editDeclaration(body);
    },
  });
  const handleSubmit = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: ITypeSaleActivityEdit = {
        saleActivityTypeID: id,
        nameEN: formValues.nameEN || '',
        nameVN: formValues.nameVN || formValues.nameEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        statusSaleActivityType: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_SALE_ACTIVITY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ITypeSaleActivityCreate = {
        nameEN: formValues.nameEN || '',
        nameVN: formValues.nameVN || formValues.nameEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        statusSaleActivityType: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_SALE_ACTIVITY))
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
      const _requestData: ITypeSaleActivityEdit = {
        saleActivityTypeID: id,
        nameEN: formValues.nameEN || '',
        nameVN: formValues.nameVN || formValues.nameEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        statusSaleActivityType: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_REQUEST_DATA],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ITypeSaleActivityCreate = {
        nameEN: formValues.nameEN || '',
        nameVN: formValues.nameVN || formValues.nameEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        statusSaleActivityType: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [TYPE_TABS.GET_TYPE_SALE_ACTIVITY_BY_REQUEST_DATA],
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
    <TypeSaleActivityForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateTypeSaleActivity;
