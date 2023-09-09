import router from 'next/router';
import { ROUTERS } from '@/constant/router';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import LocationTypeForm from '../components/form';
import { UpdateStatusLocation } from '../interface';
import { updateStatus } from '../fetcher';

const ManagerLocation = () => {
  const updateStatusMutation = useMutation({
    mutationFn: (body: UpdateStatusLocation) => {
      return updateStatus(body);
    },
  });

  const handleApproveAndReject = (id: string, status: string) => {
    const _requestData: UpdateStatusLocation = {
      id,
      status,
    };
    updateStatusMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message), router.push(ROUTERS.BANK))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <LocationTypeForm
      manager
      handleApproveAndReject={handleApproveAndReject}
      loadingSubmit={updateStatusMutation.isLoading}
      checkRow={true}
    />
  );
};

export default ManagerLocation;
