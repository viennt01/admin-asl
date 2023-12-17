import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTERS } from '@/constant/router';
import { errorToast, successToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import UnitForm from '../components/form';
import {
  IFormValues,
  IPartnerCreate,
  IPartnerEdit,
  IRolePartners,
} from '../interface';
import { createUnit, editUnit } from '../fetcher';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { API_PARTNER } from '@/fetcherAxios/endpoint';

export const returnPartnerDTOs = (
  partnerDTOs?: IRolePartners[],
  fromPartnerDTOs?: string[]
) => {
  const resultArray: Array<IRolePartners> =
    partnerDTOs?.map((item) => ({
      partnerRoleDetailID: item.partnerRoleDetailID,
      partnerRoleID: item.partnerRoleID,
      isDelete: false,
    })) || [];

  for (const item of resultArray) {
    if (fromPartnerDTOs && fromPartnerDTOs.includes(item.partnerRoleID)) {
      item.isDelete = false;
    } else {
      item.isDelete = true;
    }
  }
  console.log('resultArray1', resultArray);

  if (fromPartnerDTOs) {
    for (const id of fromPartnerDTOs) {
      if (!resultArray.some((item) => item.partnerRoleID === id)) {
        resultArray.push({
          partnerRoleID: id,
          isDelete: false,
        });
      }
    }
  }
  console.log('resultArray2', resultArray);

  return resultArray;
};

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

  const handleSubmit = (
    formValues: IFormValues,
    id?: string,
    listPartnerDTOs?: IRolePartners[]
  ) => {
    const returnFeeDTO = returnPartnerDTOs(
      listPartnerDTOs,
      formValues.rolePartners
    );
    if (id) {
      const _requestData: IPartnerEdit = {
        partnerID: id,
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
        rolePartnerUpdateRequests: returnFeeDTO || [],
        statusPartner: STATUS_ALL_LABELS.REQUEST,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.PARTNER))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: IPartnerCreate = {
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
        rolePartners: formValues.rolePartners || '',
        statusPartner: STATUS_ALL_LABELS.REQUEST,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.PARTNER))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    }
  };

  const handleSaveDraft = (
    formValues: IFormValues,
    id?: string,
    listPartnerDTOs?: IRolePartners[]
  ) => {
    const returnFeeDTO = returnPartnerDTOs(
      listPartnerDTOs,
      formValues.rolePartners
    );

    if (id) {
      const _requestData: IPartnerEdit = {
        partnerID: id,
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
        rolePartnerUpdateRequests: returnFeeDTO || [],
        statusPartner: STATUS_ALL_LABELS.DRAFT,
      };
      updateMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_PARTNER.GET_SEARCH],
              }))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      const _requestData: IPartnerCreate = {
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
        rolePartners: formValues.rolePartners || '',
        statusPartner: STATUS_ALL_LABELS.DRAFT,
      };
      createMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              queryClient.invalidateQueries({
                queryKey: [API_PARTNER.GET_SEARCH],
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
