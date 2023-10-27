import router from 'next/router';
import { IFormValues, IEditLoadCapacity } from '../interface';
import { editLoadCapacity } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import LoadCapacityForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditLoadCapacity = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: IEditLoadCapacity) => {
      return editLoadCapacity(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: IEditLoadCapacity = {
        loadCapacityID: idQuery,
        code: formValues.code || '',
        name: formValues.name || '',
        typeLoadCapacityID: formValues.typeLoadCapacityID || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusLoadCapacity:
          formValues.statusLoadCapacity || STATUS_ALL_LABELS.ACTIVE,
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
    <LoadCapacityForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditLoadCapacity;
