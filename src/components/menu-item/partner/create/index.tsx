import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import { IFormValues, IPartnerCreate, IPartnerEdit } from '../interface';
import { createUnit, editUnit } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_UNIT } from '@/fetcherAxios/endpoint';

const CreatePartner = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (body: IPartnerCreate) => {
      return createUnit(body);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: IPartnerEdit) => {
      return editUnit(body);
    },
  });

  const handleSubmit = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: IPartnerEdit = {
        userID: id,
        languageID: formValues.languageID || '',
        genderID: formValues.genderID || '',
        roleID: formValues.roleID || '',
        cityID: formValues.cityID || '',
        aslPersonalContactID: formValues.aslPersonalContactID || '',
        email: formValues.email || '',
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        fullName: `${formValues.firstName} ${formValues.lastName}` || '',
        companyNameEN: formValues.companyNameEN || '',
        companyNameVN:
          formValues.companyNameVN || formValues.companyNameEN || '',
        abbreviations: formValues.abbreviations || '',
        emailCompany: formValues.emailCompany || '',
        phoneNumber: formValues.phoneNumber || '',
        taxCode: formValues.taxCode || '',
        addressEN: formValues.addressEN || '',
        addressVN: formValues.addressVN || formValues.addressEN || '',
        birthday: formValues.birthdated?.valueOf(),
        workingBranch: formValues.workingBranch || '',
        nationality: formValues.nationality || '',
        visa: formValues.visa || '',
        citizenIdentification: formValues.citizenIdentification || '',
        website: formValues.website || '',
        note: formValues.note || '',
        avatar: formValues.avatar || '',
        statusUser: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: IPartnerCreate = {
        languageID: formValues.languageID || '',
        genderID: formValues.genderID || '',
        roleID: formValues.roleID || '',
        cityID: formValues.cityID || '',
        aslPersonalContactID: formValues.aslPersonalContactID || '',
        email: formValues.email || '',
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        fullName: `${formValues.firstName} ${formValues.lastName}` || '',
        companyNameEN: formValues.companyNameEN || '',
        companyNameVN:
          formValues.companyNameVN || formValues.companyNameEN || '',
        abbreviations: formValues.abbreviations || '',
        emailCompany: formValues.emailCompany || '',
        phoneNumber: formValues.phoneNumber || '',
        taxCode: formValues.taxCode || '',
        addressEN: formValues.addressEN || '',
        addressVN: formValues.addressVN || formValues.addressEN || '',
        birthday: formValues.birthdated?.valueOf(),
        workingBranch: formValues.workingBranch || '',
        nationality: formValues.nationality || '',
        visa: formValues.visa || '',
        citizenIdentification: formValues.citizenIdentification || '',
        website: formValues.website || '',
        note: formValues.note || '',
        avatar: formValues.avatar || '',
        statusUser: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.UNIT))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (formValues: IFormValues, id?: string) => {
    if (id) {
      const _requestData: IPartnerEdit = {
        userID: id,
        languageID: formValues.languageID || '',
        genderID: formValues.genderID || '',
        roleID: formValues.roleID || '',
        cityID: formValues.cityID || '',
        aslPersonalContactID: formValues.aslPersonalContactID || '',
        email: formValues.email || '',
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        fullName: `${formValues.firstName} ${formValues.lastName}` || '',
        companyNameEN: formValues.companyNameEN || '',
        companyNameVN:
          formValues.companyNameVN || formValues.companyNameEN || '',
        abbreviations: formValues.abbreviations || '',
        emailCompany: formValues.emailCompany || '',
        phoneNumber: formValues.phoneNumber || '',
        taxCode: formValues.taxCode || '',
        addressEN: formValues.addressEN || '',
        addressVN: formValues.addressVN || formValues.addressEN || '',
        birthday: formValues.birthdated?.valueOf(),
        workingBranch: formValues.workingBranch || '',
        nationality: formValues.nationality || '',
        visa: formValues.visa || '',
        citizenIdentification: formValues.citizenIdentification || '',
        website: formValues.website || '',
        note: formValues.note || '',
        avatar: formValues.avatar || '',
        statusUser: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_UNIT.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: IPartnerCreate = {
        languageID: formValues.languageID || '',
        genderID: formValues.genderID || '',
        roleID: formValues.roleID || '',
        cityID: formValues.cityID || '',
        aslPersonalContactID: formValues.aslPersonalContactID || '',
        email: formValues.email || '',
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        fullName: `${formValues.firstName} ${formValues.lastName}` || '',
        companyNameEN: formValues.companyNameEN || '',
        companyNameVN:
          formValues.companyNameVN || formValues.companyNameEN || '',
        abbreviations: formValues.abbreviations || '',
        emailCompany: formValues.emailCompany || '',
        phoneNumber: formValues.phoneNumber || '',
        taxCode: formValues.taxCode || '',
        addressEN: formValues.addressEN || '',
        addressVN: formValues.addressVN || formValues.addressEN || '',
        birthday: formValues.birthdated?.valueOf(),
        workingBranch: formValues.workingBranch || '',
        nationality: formValues.nationality || '',
        visa: formValues.visa || '',
        citizenIdentification: formValues.citizenIdentification || '',
        website: formValues.website || '',
        note: formValues.note || '',
        avatar: formValues.avatar || '',
        statusUser: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_UNIT.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  return (
    <UnitForm
      create
      handleSubmit={handleSubmit}
      handleSaveDraft={handleSaveDraft}
      loadingSubmit={createMutation.isLoading || updateMutation.isLoading}
      checkRow={false}
      useDraft
    />
  );
};

export default CreatePartner;
