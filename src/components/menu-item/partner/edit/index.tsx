import router from 'next/router';
import { IFormValues, IPartnerEdit, IRolePartners } from '../interface';
import { editUnit } from '../fetcher';
import { useMutation } from '@tanstack/react-query';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { returnPartnerDTOs } from '../create';

const EditPartner = () => {
  const checkRow = router.query.checkRow as string;
  const updateMutation = useMutation({
    mutationFn: (body: IPartnerEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (
    formValues: IFormValues,
    idQuery?: string,
    listPartnerDTOs?: IRolePartners[]
  ) => {
    const returnFeeDTO = returnPartnerDTOs(
      listPartnerDTOs,
      formValues.rolePartners
    );
    if (idQuery) {
      const _requestData: IPartnerEdit = {
        partnerID: idQuery,
        cityID: formValues.cityID || '',
        aslPersonalContactID: formValues.aslPersonalContactID || '',
        abbreviations: formValues.abbreviations || '',
        emailCompany: formValues.emailCompany || '',
        phoneNumber: formValues.phoneNumber || '',
        taxCode: formValues.taxCode || '',
        companyNameEN: formValues.companyName || '',
        companyNameVN: formValues.companyName || '',
        addressEN: formValues.address || '',
        addressVN: formValues.address || '',
        website: formValues.website || '',
        note: formValues.note || '',
        rolePartners: returnFeeDTO || [],
        statusPartner: STATUS_ALL_LABELS.REQUEST,
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

export default EditPartner;
