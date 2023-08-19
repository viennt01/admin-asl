import { useMutation } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/unit-form';
import { FormValues, UnitCreate } from '../interface';
import { createUnit } from '../fetcher';

const CreateUnit = () => {
  const createPortMutation = useMutation({
    mutationFn: (body: UnitCreate) => {
      return createUnit(body);
    },
  });

  const handleSubmit = (formValues: FormValues) => {
    const _requestData: UnitCreate = {
      internationalCode: formValues.internationalCode,
      descriptionVN: formValues.descriptionVN,
      descriptionEN: formValues.descriptionEN,
    };
    createPortMutation.mutate(_requestData, {
      onSuccess: (data) => {
        if (data.status) {
          router.push(ROUTERS.UNIT);
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
    <UnitForm
      create
      handleSubmit={handleSubmit}
      loading={createPortMutation.isLoading}
      checkRow={false}
    />
  );
};

export default CreateUnit;
