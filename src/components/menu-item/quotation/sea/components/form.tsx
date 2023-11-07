import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IFormValues,
  ISeaQuotationFeeFormValue,
  ISeaQuotationDetailDTOsFormValue,
  UpdateStatus,
  ISalesLeadsSeaQuotationDTOs,
  ISeaQuotaionGroupPartnerDTOs,
} from '../interface';
import {
  API_CONTAINER_TYPE,
  API_CURRENCY,
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
import SeaPricingDetailDTO from './sea-quotation-detail-dto';

import ListFee from './list-fee';
import TableSaleLead from './table-sale-lead';

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: IFormValues,
    id?: string,
    seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
    seaQuotationDetail?: ISeaQuotationDetailDTOsFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[],
    seaQuotaionGroupPartner?: ISeaQuotaionGroupPartnerDTOs[]
  ) => void;
  handleSaveDraft?: (
    formValues: IFormValues,
    id?: string,
    seaPricingFeeDTOs?: ISeaQuotationFeeFormValue[],
    seaQuotationDetail?: ISeaQuotationDetailDTOsFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[],
    seaQuotaionGroupPartner?: ISeaQuotaionGroupPartnerDTOs[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const SeaQuotation = ({
  create,
  manager,
  edit,
  handleSubmit,
  handleSaveDraft,
  loadingSubmit,
  checkRow,
  useDraft,
}: PortFormProps) => {
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
  const [seaPricingFeeDTOs, setSeaPricingFeeDTOs] = useState<
    ISeaQuotationFeeFormValue[]
  >([]);
  const [seaQuotationDetail, setSeaQuotationDetail] = useState<
    ISeaQuotationDetailDTOsFormValue[]
  >([]);
  const [salesLeads, setSalesLeads] = useState<ISalesLeadsSeaQuotationDTOs[]>(
    []
  );
  const [seaQuotaionGroupPartner, setSeaQuotaionGroupPartner] = useState<
    ISeaQuotaionGroupPartnerDTOs[]
  >([]);
  const idPartners = Form.useWatch('salesLeadsSeaQuotationDTOs', form);

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

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit &&
        handleSubmit(
          formValues,
          idQuery,
          seaPricingFeeDTOs,
          seaQuotationDetail,
          salesLeads,
          seaQuotaionGroupPartner
        );
    } else {
      handleSubmit &&
        handleSubmit(
          formValues,
          '',
          seaPricingFeeDTOs,
          seaQuotationDetail,
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
          seaPricingFeeDTOs,
          seaQuotationDetail,
          salesLeads,
          seaQuotaionGroupPartner
        );
    } else {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          '',
          seaPricingFeeDTOs,
          seaQuotationDetail,
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
          podid: data.data.podid,
          polid: data.data.polid,
          commodityID: data.data.commodityID,
          note: data.data.note,
          dateEffect: dayjs(Number(data.data.dateEffect)),
          validityDate: dayjs(Number(data.data.validityDate)),
          freqDate: data.data.freqDate,
          demSeaQuotation: data.data.demSeaQuotation,
          detSeaQuotation: data.data.detSeaQuotation,
          stoSeaQuotation: data.data.stoSeaQuotation,
          lclMinSeaQuotation: data.data.lclMinSeaQuotation,
          lclSeaQuotation: data.data.lclSeaQuotation,
          currencyID: data.data.currencyID,
          public: data.data.public,
          statusSeaQuotation: data.data.statusSeaQuotation,
          seaQuotationDetailDTOs: data.data.seaQuotationDetailDTOs,
          seaQuotaionFeeGroupDTOs: data.data.seaQuotaionFeeGroupDTOs,
          salesLeadsSeaQuotationDTOs: data.data.salesLeadsSeaQuotationDTOs?.map(
            (partner) => partner.partnerID
          ),
          seaQuotaionGroupPartnerDTOs:
            data.data.seaQuotaionGroupPartnerDTOs?.map(
              (partnerGroup) => partnerGroup.groupPartnerID
            ),
        });
        setSeaQuotationDetail(data.data.seaQuotationDetailDTOs);
        setSeaPricingFeeDTOs(data.data.seaQuotaionFeeGroupDTOs);
        setSalesLeads(data.data.salesLeadsSeaQuotationDTOs);
        setSeaQuotaionGroupPartner(data.data.seaQuotaionGroupPartnerDTOs);
      } else {
        router.push(ROUTERS.SEA_QUOTATION);
      }
    },
  });

  const handleCheckEdit = (data: boolean) => {
    setCheckPermissionEdit(data);
  };

  const handleAR = (status: string) => {
    if (idQuery) {
      const _requestData: UpdateStatus = {
        id: [idQuery],
        status,
      };
      updateStatusMutation.mutate(_requestData, {
        onSuccess: (data) => {
          data.status
            ? (successToast(data.message), router.push(ROUTERS.SEA_PRICING))
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
    mutationFn: (body: UpdateStatus) => {
      return updateStatus(body);
    },
  });

  const handleCopyAndCreate = () => {
    const props = {
      checkCopyAndCreate: true,
      podid: form.getFieldValue('podid'),
      polid: form.getFieldValue('polid'),
      commodityID: form.getFieldValue('commodityID'),
      note: form.getFieldValue('note'),
      dateEffect: form.getFieldValue('dateEffect'),
      validityDate: form.getFieldValue('validityDate'),
      freqDate: form.getFieldValue('freqDate'),
      demSeaQuotation: form.getFieldValue('demSeaQuotation'),
      detSeaQuotation: form.getFieldValue('detSeaQuotation'),
      stoSeaQuotation: form.getFieldValue('stoSeaQuotation'),
      lclMinSeaQuotation: form.getFieldValue('lclMinSeaQuotation'),
      lclSeaQuotation: form.getFieldValue('lclSeaQuotation'),
      currencyID: form.getFieldValue('currencyID'),
      public: form.getFieldValue('public'),
      statusSeaQuotation: form.getFieldValue('statusSeaQuotation'),
      seaQuotationDetailDTOs: form.getFieldValue('seaQuotationDetailDTOs'),
      seaPricingFeeDTOs: form.getFieldValue('seaPricingFeeDTOs'),
      salesLeadsSeaQuotationDTOs: form.getFieldValue(
        'salesLeadsSeaQuotationDTOs'
      ),
      seaQuotaionGroupPartnerDTOs: form.getFieldValue(
        'seaQuotaionGroupPartnerDTOs'
      ),
    };
    router.push({
      pathname: ROUTERS.SEA_QUOTATION_CREATE,
      query: props,
    });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        onFinish={onFinish}
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
          title="Sea Pricing Detail"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <SeaPricingDetailDTO
            form={form}
            optionCurrency={optionCurrency}
            optionTypeContainer={optionTypeContainer}
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
          <TableSaleLead idPartners={idPartners} />
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
        />
      </Form>
    </div>
  );
};

export default SeaQuotation;
