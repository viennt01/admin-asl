import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import TypeDeclarationForm from '../components/form';
import {
  IFormValues,
  ITypeDeclarationCreate,
  ITypeDeclarationEdit,
} from '../interface';
import { createDeclaration, editDeclaration } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_TYPE_DECLARATION } from '@/fetcherAxios/endpoint';

const CreateTypeDeclaration = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: ITypeDeclarationCreate) => {
      return createDeclaration(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ITypeDeclarationEdit) => {
      return editDeclaration(body);
    },
  });
  const handleSubmit = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: ITypeDeclarationEdit = {
        typeDelaracrionID: id,
        transactionTypeID: formValues.transactionTypeID || '',
        typeDelaracrionCode: formValues.typeDelaracrionCode || '',
        typeDelaracrionNameEN: formValues.typeDelaracrionNameEN || '',
        typeDelaracrionNameVN:
          formValues.typeDelaracrionNameVN ||
          formValues.typeDelaracrionNameEN ||
          '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        public: true,
        statusTypeDelaracrion: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_DECLARATION))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ITypeDeclarationCreate = {
        transactionTypeID: formValues.transactionTypeID || '',
        typeDelaracrionCode: formValues.typeDelaracrionCode || '',
        typeDelaracrionNameEN: formValues.typeDelaracrionNameEN || '',
        typeDelaracrionNameVN:
          formValues.typeDelaracrionNameVN ||
          formValues.typeDelaracrionNameEN ||
          '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        public: true,
        statusTypeDelaracrion: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TYPE_DECLARATION))
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
      const _requestData: ITypeDeclarationEdit = {
        typeDelaracrionID: id,
        transactionTypeID: formValues.transactionTypeID || '',
        typeDelaracrionCode: formValues.typeDelaracrionCode || '',
        typeDelaracrionNameEN: formValues.typeDelaracrionNameEN || '',
        typeDelaracrionNameVN:
          formValues.typeDelaracrionNameVN ||
          formValues.typeDelaracrionNameEN ||
          '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        public: true,
        statusTypeDelaracrion: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TYPE_DECLARATION.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: ITypeDeclarationCreate = {
        transactionTypeID: formValues.transactionTypeID || '',
        typeDelaracrionCode: formValues.typeDelaracrionCode || '',
        typeDelaracrionNameEN: formValues.typeDelaracrionNameEN || '',
        typeDelaracrionNameVN:
          formValues.typeDelaracrionNameVN ||
          formValues.typeDelaracrionNameEN ||
          '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        public: true,
        statusTypeDelaracrion: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_TYPE_DECLARATION.GET_SEARCH],
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
    <TypeDeclarationForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateTypeDeclaration;
