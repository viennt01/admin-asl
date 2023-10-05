import router from 'next/router';
import { FormValues, CurrencyEdit } from '../interface';
import { editCurrency } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import CurrencyForm from '../components/form';

const EditCurrency = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: CurrencyEdit) => {
      return editCurrency(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: CurrencyEdit = {
        currencyID: idQuery,
        currencyName: formValues.currencyName || '',
        exchangeRateToVND: formValues.exchangeRateToVND || '',
        exchangeRateToUSD: formValues.exchangeRateToUSD || '',
        statusCurrency: formValues.statusCurrency,
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
    <CurrencyForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditCurrency;
