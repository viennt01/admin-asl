import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IFormValues,
  ITruckQuotationFeeFormValue,
  IContainerDTOFormValue,
  IUpdateStatus,
  ISalesLeadsSeaQuotationDTOs,
  ITruckQuotaionGroupPartnerDTOs,
  ILoadCapacityDTOFormValue,
} from '../interface';
import {
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_LOAD_CAPACITY,
  API_SEA_QUOTATION,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllContainerType,
  getAllCurrency,
  getSeaQuotationDetail,
  updateStatus,
} from '../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CardMain from './card-main';
import CollapseCard from '@/components/commons/collapse-card';
import ContainerDetailDTO from './container-detail-dto';

import ListFee from './list-fee';
import LoadCapacityDetailDTO from './load-capacity-detail-dto';
import { getAllLoadCapacity } from '@/components/menu-item/pricing/trucking/fetcher';
import { TYPE_LOAD_CAPACITY } from '@/components/menu-item/pricing/air/interface';
import SaleLead from './sale-lead';

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: IFormValues,
    id?: string,
    feeDTOs?: ITruckQuotationFeeFormValue[],
    containerDetail?: IContainerDTOFormValue[],
    loadCapacityDetail?: ILoadCapacityDTOFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[],
    seaQuotaionGroupPartner?: ITruckQuotaionGroupPartnerDTOs[]
  ) => void;
  handleSaveDraft?: (
    formValues: IFormValues,
    id?: string,
    feeDTOs?: ITruckQuotationFeeFormValue[],
    containerDetail?: IContainerDTOFormValue[],
    loadCapacityDetail?: ILoadCapacityDTOFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[],
    seaQuotaionGroupPartner?: ITruckQuotaionGroupPartnerDTOs[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const initalValues = {
  truckingQuotationFeeGroupDTOs: [],
};

const TruckQuotation = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: FormProps) => {
  const router = useRouter();
  const [form] = Form.useForm<IFormValues>();
  const { id } = router.query;
  const [idQuery, setIdQuery] = useState<string>();
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);
  const [optionTypeContainer, setOptionTypeContainer] = useState<
    { value: string; label: string }[]
  >([]);
  const [optionLoadCapacity, setOptionLoadCapacity] = useState<
    { value: string; label: string }[]
  >([]);
  const [feeDTOs, setFeeDTOs] = useState<ITruckQuotationFeeFormValue[]>([]);
  const [containerDetail, setContainerDetail] = useState<
    IContainerDTOFormValue[]
  >([]);
  const [loadCapacityDetail, setLoadCapacityDetail] = useState<
    ILoadCapacityDTOFormValue[]
  >([]);
  const [salesLeads, setSalesLeads] = useState<ISalesLeadsSeaQuotationDTOs[]>(
    []
  );
  const [seaQuotaionGroupPartner, setSeaQuotaionGroupPartner] = useState<
    ITruckQuotaionGroupPartnerDTOs[]
  >([]);
  const idPartners = Form.useWatch('salesLeadsTruckingQuotationDTOs', form);

  useEffect(() => {
    if (!id) return;
    setIdQuery(id as string);
  }, [router, form, id]);
  //get currencies
  useQuery({
    queryKey: [API_CURRENCY.GET_ALL],
    queryFn: () => getAllCurrency(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionCurrency(
          data.data.map((currency) => {
            return {
              value: currency.currencyID,
              label: currency.abbreviations,
            };
          })
        );
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });
  // get container type
  useQuery({
    queryKey: [API_CONTAINER_TYPE.GET_ALL],
    queryFn: () => getAllContainerType(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionTypeContainer(
          data.data.map((currency) => {
            return {
              value: currency.containerTypeID,
              label: currency.code,
            };
          })
        );
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  // get load capacity
  useQuery({
    queryKey: [API_LOAD_CAPACITY.GET_ALL],
    queryFn: () => getAllLoadCapacity({ type: TYPE_LOAD_CAPACITY.TRUCKING }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setOptionLoadCapacity(
          data.data.map((loadCapacity) => {
            return {
              value: loadCapacity.loadCapacityID,
              label: loadCapacity.name,
            };
          })
        );
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit &&
        handleSubmit(
          formValues,
          idQuery,
          feeDTOs,
          containerDetail,
          loadCapacityDetail,
          salesLeads,
          seaQuotaionGroupPartner
        );
    } else {
      handleSubmit &&
        handleSubmit(
          formValues,
          '',
          feeDTOs,
          containerDetail,
          loadCapacityDetail,
          salesLeads,
          seaQuotaionGroupPartner
        );
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          idQuery,
          feeDTOs,
          containerDetail,
          loadCapacityDetail,
          salesLeads,
          seaQuotaionGroupPartner
        );
    } else {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          '',
          feeDTOs,
          containerDetail,
          loadCapacityDetail,
          salesLeads,
          seaQuotaionGroupPartner
        );
    }
  };

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const detailQuery = useQuery({
    queryKey: [API_SEA_QUOTATION.GET_DETAIL, idQuery],
    queryFn: () => getSeaQuotationDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          truckingPricingID: data.data.truckingPricingID,
          truckingQuotationNo: data.data.truckingQuotationNo,
          pickupID: data.data.pickupID,
          deliveryID: data.data.deliveryID,
          commodityID: data.data.commodityID,
          currencyID: data.data.currencyID,
          vendorID: data.data.vendorID,
          note: data.data.note,
          effectDated: dayjs(Number(data.data.effectDated)),
          validityDate: dayjs(Number(data.data.validityDate)),
          freqDate: data.data.freqDate,
          public: data.data.public,
          transitTimeTruckingQuotation: data.data.transitTimeTruckingQuotation,
          forNewUser: data.data.forNewUser,
          statusTruckingQuotation: data.data.statusTruckingQuotation,
          truckingQuotationDetailByContainerTypeDTOs:
            data.data.truckingQuotationDetailByContainerTypeDTOs,
          truckingQuotationDetailByLoadCapacityDTOs:
            data.data.truckingQuotationDetailByLoadCapacityDTOs,
          truckingQuotationFeeGroupDTOs:
            data.data.truckingQuotationFeeGroupDTOs,
          salesLeadsTruckingQuotationDTOs:
            data.data.salesLeadsTruckingQuotationDTOs?.map(
              (partner) => partner.partnerID
            ),
          truckingQuotaionGroupPartnerDTOs:
            data.data.truckingQuotaionGroupPartnerDTOs?.map(
              (partnerGroup) => partnerGroup.groupPartnerID
            ),
        });
        setContainerDetail(
          data.data.truckingQuotationDetailByContainerTypeDTOs
        );
        setLoadCapacityDetail(
          data.data.truckingQuotationDetailByLoadCapacityDTOs
        );
        setFeeDTOs(data.data.truckingQuotationFeeGroupDTOs);
        setSalesLeads(data.data.salesLeadsTruckingQuotationDTOs);
        setSeaQuotaionGroupPartner(data.data.truckingQuotaionGroupPartnerDTOs);
      } else {
        router.push(ROUTERS.TRUCKING_QUOTATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: IUpdateStatus = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message),
              router.push(ROUTERS.TRUCKING_QUOTATION))
            : errorToast(data.message);
        },
        onError() {
          errorToast(API_MESSAGE.ERROR);
        },
      });
    } else {
      errorToast(API_MESSAGE.ERROR);
    }
  };

  const updateStatusMutation = useMutation({
    mutationFn: (body: IUpdateStatus) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,

      truckingPricingID: form.getFieldValue('truckingPricingID'),
      truckingQuotationNo: form.getFieldValue('truckingQuotationNo'),
      pickupID: form.getFieldValue('pickupID'),
      deliveryID: form.getFieldValue('deliveryID'),
      emtyPickupID: form.getFieldValue('emtyPickupID'),
      commodityID: form.getFieldValue('commodityID'),
      currencyID: form.getFieldValue('currencyID'),
      vendorID: form.getFieldValue('vendorID'),
      note: form.getFieldValue('note'),
      forNewUser: form.getFieldValue('forNewUser'),
      effectDated: form.getFieldValue('effectDated')?.valueOf(),
      validityDate: form.getFieldValue('validityDate')?.valueOf(),
      freqDate: form.getFieldValue('freqDate'),
      lclMinTruckingQuotation: form.getFieldValue('lclMinTruckingQuotation'),
      lclTruckingQuotation: form.getFieldValue('lclTruckingQuotation'),
      public: form.getFieldValue('public'),
      transitTimeTruckingQuotation: form.getFieldValue(
        'transitTimeTruckingQuotation'
      ),
      statusTruckingQuotation: form.getFieldValue('statusTruckingQuotation'),
      truckingQuotationDetailByContainerTypeDTOs: JSON.stringify(
        form.getFieldValue('truckingQuotationDetailByContainerTypeDTOs')
      ),
      truckingQuotationDetailByLoadCapacityDTOs: JSON.stringify(
        form.getFieldValue('truckingQuotationDetailByLoadCapacityDTOs')
      ),
      truckingQuotationFeeGroupDTOs: JSON.stringify(
        form.getFieldValue('truckingQuotationFeeGroupDTOs')
      ),
      salesLeadsTruckingQuotationDTOs: JSON.stringify(
        form.getFieldValue('salesLeadsTruckingQuotationDTOs')
      ),
      truckingQuotaionGroupPartnerDTOs: JSON.stringify(
        form.getFieldValue('truckingQuotaionGroupPartnerDTOs')
      ),
    };
    router.push({
      pathname: ROUTERS.TRUCKING_QUOTATION_CREATE,
      query: props,
    });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initalValues}
        autoComplete="off"
        layout="vertical"
      >
        <CardMain
          create={create}
          manager={manager}
          edit={edit}
          handleSubmit={handleSubmit}
          handleSaveDraft={handleSaveDraft}
          loadingSubmit={loadingSubmit}
          checkRow={checkRow}
          useDraft={useDraft}
          optionCurrency={optionCurrency}
          form={form}
          idQuery={idQuery}
          handleIdQuery={handleIdQuery}
          handleCheckEdit={handleCheckEdit}
          isCheckPermissionEdit={isCheckPermissionEdit}
        />

        <CollapseCard
          title="FLC"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <ContainerDetailDTO
            form={form}
            optionCurrency={optionCurrency}
            optionTypeContainer={optionTypeContainer}
            isCheckPermissionEdit={isCheckPermissionEdit}
          />
        </CollapseCard>

        <CollapseCard
          title="LCL"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <LoadCapacityDetailDTO
            form={form}
            optionCurrency={optionCurrency}
            optionTypeLoadCapacity={optionLoadCapacity}
            isCheckPermissionEdit={isCheckPermissionEdit}
          />
        </CollapseCard>

        <CollapseCard
          title="Other Charges"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <ListFee form={form} create={create} />
        </CollapseCard>

        <CollapseCard
          title="Customer"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <SaleLead idPartners={idPartners} />
        </CollapseCard>

        <BottomCreateEdit
          create={create}
          checkRow={checkRow}
          edit={edit}
          loading={loadingSubmit || false}
          isCheckPermissionEdit={isCheckPermissionEdit}
          insertedByUser={detailQuery.data?.data?.insertedByUser || ''}
          dateInserted={detailQuery.data?.data?.dateInserted || ''}
          updatedByUser={detailQuery.data?.data?.updatedByUser || ''}
          dateUpdated={detailQuery.data?.data?.dateUpdated || ''}
          handleCheckEdit={handleCheckEdit}
          handleSaveDraft={onSaveDraft}
          manager={manager}
          handleAR={handleAR}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
          checkPermissionEdit={true}
        />
      </Form>
    </div>
  );
};

export default TruckQuotation;
