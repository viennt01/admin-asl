import router from 'next/router';
import { FormValues, ILoadCapacityTypeEdit } from '../interface';
import { editLoadCapacityType } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import LoadCapacityTypeForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditLoadCapacityType = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ILoadCapacityTypeEdit) => {
      return editLoadCapacityType(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: ILoadCapacityTypeEdit = {
        typeLoadCapacityID: idQuery,
        typeLoadCapacityCode: formValues.typeLoadCapacityCode || '',
        typeLoadCapacityNameEN: formValues.typeLoadCapacityNameEN || '',
        typeLoadCapacityNameVN:
          formValues.typeLoadCapacityNameVN ||
          formValues.typeLoadCapacityNameEN ||
          '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        public: true,
        statusTypeLoadCapacity:
          formValues.statusTypeLoadCapacity || STATUS_ALL_LABELS.ACTIVE,
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
    <LoadCapacityTypeForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditLoadCapacityType;
