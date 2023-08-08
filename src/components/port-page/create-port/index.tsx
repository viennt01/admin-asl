import { useMutation } from '@tanstack/react-query';
import PortForm from '../components/port-form';
import { FormValues, PortCreate } from '../interface';
import { createPort } from '../fetcher';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';

const CreatePort = () => {
  const createPortMutation = useMutation({
    mutationFn: (body: PortCreate) => {
      return createPort(body);
    },
  });

  const handleSubmit = (formValues: FormValues) => {
    const _requestData: PortCreate = {
      portName: formValues.portName,
      portCode: formValues.portCode,
      typePorts: formValues.typePorts,
      countryID: formValues.countryID,
      address: formValues.address,
      description: formValues.description,
    };
    createPortMutation.mutate(_requestData, {
      onSuccess: (data) => {
        if (data.status) {
          router.push(ROUTERS.PORT);
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
      create
      handleSubmit={handleSubmit}
      loading={createPortMutation.isLoading}
    />
  );
};

export default CreatePort;
