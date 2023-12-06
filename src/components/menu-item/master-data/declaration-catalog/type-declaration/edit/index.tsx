import router from 'next/router';
import { IFormValues, ITypeDeclarationEdit } from '../interface';
import { editDeclaration } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TypeDeclarationForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditTypeDeclaration = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ITypeDeclarationEdit) => {
      return editDeclaration(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: ITypeDeclarationEdit = {
        typeDelaracrionID: idQuery,
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
          data.status ? successToast(data.message) : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      errorToast(API_MESSAGE.ERROR);
    }
  };

  return (
    <TypeDeclarationForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTypeDeclaration;
