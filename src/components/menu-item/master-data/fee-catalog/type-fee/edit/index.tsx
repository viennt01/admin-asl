import router from 'next/router';
import { FormValues, TypeFeeEdit } from '../interface';
import { editTypeFee } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TypeFeeForm from '../components/form';

const EditTypeFee = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: TypeFeeEdit) => {
      return editTypeFee(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: TypeFeeEdit = {
        typeFeeID: idQuery,
        typeFeeNo: formValues.typeFeeNo || '',
        typeFeeNameEN: formValues.typeFeeNameEN || '',
        typeFeeNameVN: formValues.typeFeeNameVN || '',
        statusTypeFee: formValues.statusTypeFee,
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
    <TypeFeeForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTypeFee;
