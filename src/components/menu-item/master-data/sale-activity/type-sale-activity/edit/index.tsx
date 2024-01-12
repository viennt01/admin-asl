import router from 'next/router';
import { IFormValues, ITypeSaleActivityEdit } from '../interface';
import { editDeclaration } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TypeSaleActivityForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditTypeSaleActivity = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ITypeSaleActivityEdit) => {
      return editDeclaration(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: ITypeSaleActivityEdit = {
        saleActivityTypeID: idQuery,
        nameEN: formValues.nameEN || '',
        nameVN: formValues.nameVN || formValues.nameEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        statusSaleActivityType: STATUS_ALL_LABELS.REQUEST,
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
    <TypeSaleActivityForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTypeSaleActivity;
