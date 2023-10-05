import router from 'next/router';
import { FormValues, ContainerTypeEdit } from '../interface';
import { editContainerType } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import TypeOfContainerTypeForm from '../components/form';

const EditTypeOfContainer = () => {
  const checkRow = router.query.checkRow as string;
  const updateContainerTypeMutation = useMutation({
    mutationFn: (body: ContainerTypeEdit) => {
      return editContainerType(body);
    },
  });

  const handleSubmit = (formValues: FormValues, idQuery?: string) => {
    if (idQuery) {
      const _requestData: ContainerTypeEdit = {
        containerTypeID: idQuery,
        containerTypeCode: formValues.containerTypeCode,
        name: formValues.name,
        detailsEN: formValues.detailsEN,
        detailsVN: formValues.detailsVN,
        teus: formValues.teus,
        statusContainerType: formValues.statusContainerType,
      };
      updateContainerTypeMutation.mutate(_requestData, {
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
    <TypeOfContainerTypeForm
      edit
      handleSubmit={handleSubmit}
      loadingSubmit={updateContainerTypeMutation.isLoading}
      checkRow={checkRow === 'true' ? true : false}
    />
  );
};

export default EditTypeOfContainer;
