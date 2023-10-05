import router from 'next/router';
import { FormValues, LocationTypeEdit } from '../interface';
import { editLocationType } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import LocationTypeForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditLocationType = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: LocationTypeEdit) => {
      return editLocationType(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: LocationTypeEdit = {
        typeLocationID: idQuery,
        typeLocationNameEN: formValues.typeLocationNameEN || '',
        typeLocationNameVN:
          formValues.typeLocationNameVN || formValues.typeLocationNameEN || '',
        descriptionEN: formValues.descriptionEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        statusTypeLocation:
          formValues.statusTypeLocation || STATUS_ALL_LABELS.ACTIVE,
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
    <LocationTypeForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditLocationType;
