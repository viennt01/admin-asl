import router from 'next/router';
import { IFormValues, ITypeUnitEdit } from '../interface';
import { editUnit } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';

const EditTypeUnit = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: ITypeUnitEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, idQuery?: string) => {
    console.log(formValues);

    if (idQuery) {
      const _requestData: ITypeUnitEdit = {
        typeUnitID: idQuery,
        typeUnitNameEN: formValues.typeUnitNameEN || '',
        typeUnitNameVN:
          formValues.typeUnitNameVN || formValues.typeUnitNameEN || '',
        descriptionVN:
          formValues.descriptionVN || formValues.descriptionEN || '',
        descriptionEN: formValues.descriptionEN || '',
        statusTypeUnit: formValues.statusTypeUnit || STATUS_ALL_LABELS.ACTIVE,
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
    <UnitForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTypeUnit;
