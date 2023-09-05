import router from 'next/router';
import { ROUTERS } from '@/constant/router';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import CurrencyForm from '../components/form';
import { UpdateStatusCurrency } from '../interface';
import { updateStatus } from '../fetcher';

const ManagerCurrency = () => {
  const updateStatusCurrencyMutation = useMutation({
    mutationFn: (body: UpdateStatusCurrency) => {
      return updateStatus(body);
    },
  });

  const handleApproveAndReject = (id: string, status: string) => {
    const _requestData: UpdateStatusCurrency = {
      id,
      status,
    };
    updateStatusCurrencyMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message), router.push(ROUTERS.CURRENCY))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <CurrencyForm
      manager
      handleApproveAndReject={handleApproveAndReject}
      loadingSubmit={updateStatusCurrencyMutation.isLoading}
      checkRow={true}
    />
  );
};

export default ManagerCurrency;
