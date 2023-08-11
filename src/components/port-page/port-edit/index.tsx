import router from 'next/router';
import PortForm from '../components/port-form';
import { FormValues, PortEdit } from '../interface';
import { ROUTERS } from '@/constant/router';
import { editPort } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

const EditPort = () => {
  const portId = router.query.id as string;
  const checkRow = router.query.checkRow as string;

  const updatePortMutation = useMutation({
    mutationFn: (body: PortEdit) => {
      return editPort(body);
    },
  });

  if (!portId) {
    router.push(ROUTERS.PORT);
    return;
  }

  const handleSubmit = (formValues: FormValues) => {
    const _requestData: PortEdit = {
      portID: portId,
      countryID: formValues.countryID,
      portName: formValues.portName,
      portCode: formValues.portCode,
      typePorts: formValues.typePorts,
      address: formValues.address,
      description: formValues.description,
      status: formValues.status,
    };
    updatePortMutation.mutate(_requestData, {
      onSuccess: (data) => {
        if (data.status) {
          successToast(data.message);
        } else {
          errorToast(data.message);
        }
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <PortForm
      handleSubmit={handleSubmit}
      loading={updatePortMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditPort;
