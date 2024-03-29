import router from 'next/router';
import { FormValues, FeeEdit } from '../interface';
import { editFee } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import FeeForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditFee = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: FeeEdit) => {
      return editFee(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: FeeEdit = {
        feeID: idQuery,
        feeNo: formValues.feeNo || '',
        feeNameEN: formValues.feeNameEN || '',
        feeNameVN: formValues.feeNameVN || '',
        vatFee: formValues.vatFee || '',
        typeFeeID: formValues.typeFeeID || '',
        currencyID: formValues.currencyID || '',
        unitID: formValues.unitID || '',
        public: true,
        statusFee: STATUS_ALL_LABELS.REQUEST,
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
    <FeeForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditFee;
