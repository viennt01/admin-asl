import router from 'next/router';
import { ROUTERS } from '@/constant/router';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/unit-form';
import { UpdateStatusUnit } from '../interface';
import { updateStatus } from '../fetcher';

const ManagerUnit = () => {
  const updateStatusUnitMutation = useMutation({
    mutationFn: (body: UpdateStatusUnit) => {
      return updateStatus(body);
    },
  });

  const handleApproveAndReject = (id: string, status: string) => {
    const _requestData: UpdateStatusUnit = {
      id,
      status,
    };
    updateStatusUnitMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message), router.push(ROUTERS.UNIT))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <UnitForm
      handleApproveAndReject={handleApproveAndReject}
      loadingSubmit={updateStatusUnitMutation.isLoading}
      checkRow={false}
      manager
    />
  );
};

export default ManagerUnit;
