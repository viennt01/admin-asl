import router from 'next/router';
import { FormValues, LocationTypeEdit } from '../interface';
import { editLocation } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import LocationForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditLocation = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: LocationTypeEdit) => {
      return editLocation(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: LocationTypeEdit = {
        locationID: idQuery,
        cityID: formValues.cityID || '',
        cityName: formValues.cityName || '',
        locationCode: formValues.locationCode || '',
        locationNameEN: formValues.locationNameEN || '',
        locationNameVN:
          formValues.locationNameVN || formValues.locationNameEN || '',
        typeLocations: formValues.typeLocations || [],
        statusLocation: formValues.statusLocation || STATUS_ALL_LABELS.ACTIVE,
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
    <LocationForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditLocation;
