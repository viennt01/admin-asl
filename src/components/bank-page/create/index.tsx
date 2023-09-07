import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import BankForm from '../components/form';
import { FormValues, BankCreate, BankEdit } from '../interface';
import { createBank, editBank } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_BANK } from '@/fetcherAxios/endpoint';

const CreateBank = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: BankCreate) => {
      return createBank(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: BankEdit) => {
      return editBank(body);
    },
  });

  const handleSubmit = (formValues: FormValues, id?: string) => {
    if (id) {
      const _requestData: BankEdit = {
        bankID: id,
        bankNo: formValues.bankNo || '',
        bankName: formValues.bankName || '',
        accountNumberVND: formValues.accountNumberVND || '',
        accountNumberUSD: formValues.accountNumberUSD || '',
        phoneNumber: formValues.phoneNumber || '',
        email: formValues.email || '',
        address: formValues.address || '',
        bankBranch: formValues.bankBranch || '',
        note: formValues.note || '',
        statusBank: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.BANK))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: BankCreate = {
        bankNo: formValues.bankNo || '',
        bankName: formValues.bankName || '',
        accountNumberVND: formValues.accountNumberVND || '',
        accountNumberUSD: formValues.accountNumberUSD || '',
        phoneNumber: formValues.phoneNumber || '',
        email: formValues.email || '',
        address: formValues.address || '',
        bankBranch: formValues.bankBranch || '',
        note: formValues.note || '',
        statusBank: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.BANK))
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
      const _requestData: BankEdit = {
        bankID: id,
        bankNo: formValues.bankNo || '',
        bankName: formValues.bankName || '',
        accountNumberVND: formValues.accountNumberVND || '',
        accountNumberUSD: formValues.accountNumberUSD || '',
        phoneNumber: formValues.phoneNumber || '',
        email: formValues.email || '',
        address: formValues.address || '',
        bankBranch: formValues.bankBranch || '',
        note: formValues.note || '',
        statusBank: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_BANK.GET_DRAFT],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: BankCreate = {
        bankNo: formValues.bankNo || '',
        bankName: formValues.bankName || '',
        accountNumberVND: formValues.accountNumberVND || '',
        accountNumberUSD: formValues.accountNumberUSD || '',
        phoneNumber: formValues.phoneNumber || '',
        email: formValues.email || '',
        address: formValues.address || '',
        bankBranch: formValues.bankBranch || '',
        note: formValues.note || '',
        statusBank: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_BANK.GET_DRAFT],
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
    <BankForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreateBank;
