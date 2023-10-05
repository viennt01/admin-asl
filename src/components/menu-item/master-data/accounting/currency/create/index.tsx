import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import CurrencyForm from '../components/form';
import { FormValues, CurrencyCreate, CurrencyEdit } from '../interface';
import { createCurrency, editCurrency } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_CURRENCY } from '@/fetcherAxios/endpoint';

const CreateCurrency = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: CurrencyCreate) => {
      return createCurrency(body);
    },
  });

  const updateCurrencyMutation = useMutation({
    mutationFn: (body: CurrencyEdit) => {
      return editCurrency(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: CurrencyEdit = {
        currencyID: id,
        currencyName: formValues.currencyName || '',
        exchangeRateToVND: formValues.exchangeRateToVND || '',
        exchangeRateToUSD: formValues.exchangeRateToUSD || '',
        statusCurrency: STATUS_ALL_LABELS.REQUEST,
      };
      updateCurrencyMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.CURRENCY))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: CurrencyCreate = {
        currencyName: formValues.currencyName || '',
        exchangeRateToVND: formValues.exchangeRateToVND || '',
        exchangeRateToUSD: formValues.exchangeRateToUSD || '',
        statusCurrency: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.CURRENCY))
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
      const _requestData: CurrencyEdit = {
        currencyID: id,
        currencyName: formValues.currencyName || '',
        exchangeRateToVND: formValues.exchangeRateToVND || '',
        exchangeRateToUSD: formValues.exchangeRateToUSD || '',
        statusCurrency: STATUS_ALL_LABELS.DRAFT,
      };
      updateCurrencyMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_CURRENCY.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: CurrencyCreate = {
        currencyName: formValues.currencyName || '',
        exchangeRateToVND: formValues.exchangeRateToVND || '',
        exchangeRateToUSD: formValues.exchangeRateToUSD || '',
        statusCurrency: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_CURRENCY.GET_SEARCH],
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
    <CurrencyForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateCurrency;
