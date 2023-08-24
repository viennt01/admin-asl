import router from 'next/router';
import { FormValues, UnitEdit } from '../interface';
import { ROUTERS } from '@/constant/router';
import { editUnit } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/unit-form';

const EditUnit = () => {
  const unitID = router.query.id as string;
  const checkRow = router.query.checkRow as string;

  const updateUnitMutation = useMutation({
    mutationFn: (body: UnitEdit) => {
      return editUnit(body);
    },
  });

  if (!unitID) {
    router.push(ROUTERS.UNIT);
    return;
  }

  const handleSubmit = (formValues: FormValues) => {
    const _requestData: UnitEdit = {
      unitID: unitID,
      internationalCode: formValues.internationalCode,
      descriptionVN: formValues.descriptionVN,
      descriptionEN: formValues.descriptionEN,
      statusUnit: formValues.statusUnit,
    };
    updateUnitMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status ? successToast(data.message) : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <UnitForm
      handleSubmit={handleSubmit}
      loadingSubmit={updateUnitMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditUnit;
