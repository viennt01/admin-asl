import router from 'next/router';
import { ROUTERS } from '@/constant/router';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TypeOfContainerTypeForm from '../components/type-of-container-type-form';
import { UpdateStatusContainerType } from '../interface';
import { updateStatus } from '../fetcher';

const ManagerTypeOfContainer = () => {
  const updateStatusContainerTypeMutation = useMutation({
    mutationFn: (body: UpdateStatusContainerType) => {
      return updateStatus(body);
    },
  });

  const handleApproveAndReject = (id: string, status: string) => {
    const _requestData: UpdateStatusContainerType = {
      id,
      status,
    };
    updateStatusContainerTypeMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            router.push(ROUTERS.TYPES_OF_CONTAINER))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <TypeOfContainerTypeForm
      manager
      handleApproveAndReject={handleApproveAndReject}
      loadingSubmit={updateStatusContainerTypeMutation.isLoading}
      checkRow={true}
    />
  );
};

export default ManagerTypeOfContainer;
