import router from 'next/router';
import { FormValues, BankEdit } from '../interface';
import { editBank } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import BankForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditBank = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: BankEdit) => {
      return editBank(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: BankEdit = {
        bankID: idQuery,
        bankNo: formValues.bankNo || '',
        bankName: formValues.bankName || '',
        accountNumberVND: formValues.accountNumberVND || '',
        accountNumberUSD: formValues.accountNumberUSD || '',
        phoneNumber: formValues.phoneNumber || '',
        email: formValues.email || '',
        address: formValues.address || '',
        bankBranch: formValues.bankBranch || '',
        note: formValues.note || '',
        statusBank: formValues.statusBank || STATUS_ALL_LABELS.ACTIVE,
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
    <BankForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditBank;
