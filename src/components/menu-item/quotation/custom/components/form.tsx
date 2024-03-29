import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  IFormValues,
  ISalesLeadsSeaQuotationDTOs,
  ISeaQuotationFeeFormValue,
  UpdateStatus,
} from '../interface';
import {
  API_CURRENCY,
  API_CUSTOMS_QUOTATION,
  API_UNIT,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllCurrency,
  getCustomQuotationDetail,
  updateStatus,
} from '../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CardMain from './card-main';
import CollapseCard from '@/components/commons/collapse-card';
import ListFee from './list-fee';
import LCL from './lcl';
import FCL from './fcl';
import Air from './air';
import { getListTypeUnit } from '@/components/menu-item/master-data/fee-catalog/fee/fetcher';
import { TYPE_UNIT } from '@/components/menu-item/master-data/fee-catalog/fee/interface';
import SaleLead from './sale-lead';
import { ROLE } from '@/constant/permission';
import { AppContext } from '@/app-context';

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: IFormValues,
    id?: string,
    seaQuotationFeeDTOs?: ISeaQuotationFeeFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => void;
  handleSaveDraft?: (
    formValues: IFormValues,
    id?: string,
    seaQuotationFeeDTOs?: ISeaQuotationFeeFormValue[],
    salesLeads?: ISalesLeadsSeaQuotationDTOs[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const initialValue = {
  customQuotationFeeGroupDTOs: [],
};

const CustomsQuotation = ({
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
  const { role } = useContext(AppContext);
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);
  const [dataUnit, setDataUnit] = useState<{ label: string; value: string }[]>(
    []
  );
  const [seaQuotationFeeDTOs, setSeaQuotationFeeDTOs] = useState<
    ISeaQuotationFeeFormValue[]
  >([]);
  const idPartners = Form.useWatch('salesLeadsCustomQuotationDTOs', form);
  const [salesLeads, setSalesLeads] = useState<ISalesLeadsSeaQuotationDTOs[]>(
    []
  );
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

  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit({ type: TYPE_UNIT.SEA }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        const newData = data.data.map((unit) => ({
          label: unit.internationalCode,
          value: unit.unitID,
        }));
        setDataUnit(newData);
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
        handleSubmit(formValues, idQuery, seaQuotationFeeDTOs, salesLeads);
    } else {
      handleSubmit &&
        handleSubmit(formValues, '', seaQuotationFeeDTOs, salesLeads);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          idQuery,
          seaQuotationFeeDTOs,
          salesLeads
        );
    } else {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          '',
          seaQuotationFeeDTOs,
          salesLeads
        );
    }
  };

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const detailQuery = useQuery({
    queryKey: [API_CUSTOMS_QUOTATION.GET_DETAIL, idQuery],
    queryFn: () => getCustomQuotationDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          typeDelaracrionID: data.data.typeDelaracrionID,
          commodityID: data.data.commodityID,
          currencyID: data.data.currencyID,
          transactionTypeID: data.data.transactionTypeID,
          note: data.data.note,
          vendorID: data.data.vendorID,
          effectDated: dayjs(Number(data.data.effectDated)),
          validityDate: dayjs(Number(data.data.validityDate)),
          forNewUser: data.data.forNewUser,
          public: data.data.public,
          statusCustomQuotation: data.data.statusCustomQuotation,
          customQuotationLCLDetailDTO: data.data.customQuotationLCLDetailDTO,
          customQuotationFCLDetailDTOs: data.data.customQuotationFCLDetailDTOs,
          customQuotationAirDetailDTO: data.data.customQuotationAirDetailDTO,
          customQuotationFeeGroupDTOs: data.data.customQuotationFeeGroupDTOs,
          salesLeadsCustomQuotationDTOs:
            data.data.salesLeadsCustomQuotationDTOs.map(
              (item) => item.partnerID
            ),
        });
        setSeaQuotationFeeDTOs(data.data.customQuotationFeeGroupDTOs);
        setSalesLeads(data.data.salesLeadsCustomQuotationDTOs);
      } else {
        router.push(ROUTERS.CUSTOMS_QUOTATION);
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
            ? (successToast(data.message),
              router.push(ROUTERS.CUSTOMS_QUOTATION))
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
      typeDelaracrionID: form.getFieldValue('typeDelaracrionID'),
      partnerID: form.getFieldValue('partnerID'),
      commodityID: form.getFieldValue('commodityID'),
      currencyID: form.getFieldValue('currencyID'),
      transactionTypeID: form.getFieldValue('transactionTypeID'),
      note: form.getFieldValue('note'),
      vendorID: form.getFieldValue('vendorID'),
      effectDated: form.getFieldValue('effectDated')?.valueOf(),
      validityDate: form.getFieldValue('validityDate')?.valueOf(),
      forNewUser: form.getFieldValue('forNewUser'),
      public: form.getFieldValue('public'),
      statusCustomQuotation: form.getFieldValue('statusCustomQuotation'),
      customQuotationLCLDetailDTO: form.getFieldValue(
        'customQuotationLCLDetailDTO'
      ),
      customQuotationFCLDetailDTOs: form.getFieldValue(
        'customQuotationFCLDetailDTOs'
      ),
      customQuotationAirDetailDTO: form.getFieldValue(
        'customQuotationAirDetailDTO'
      ),
      customQuotationFeeGroupDTOs: JSON.stringify(
        form.getFieldValue('customQuotationFeeGroupDTOs')
      ),
    };
    router.push({
      pathname: ROUTERS.CUSTOMS_QUOTATION_CREATE,
      query: props,
    });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initialValue}
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
          title="Other Charges"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <ListFee form={form} create={create} />
        </CollapseCard>

        <CollapseCard
          title="SEA LCL"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <LCL form={form} />
        </CollapseCard>

        <CollapseCard
          title="SEA FCL"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <FCL
            form={form}
            optionUnit={dataUnit}
            isCheckPermissionEdit={isCheckPermissionEdit}
          />
        </CollapseCard>

        <CollapseCard
          title="Air"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <Air form={form} />
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
          handleAR={role === ROLE.MANAGER ? handleAR : undefined}
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
          checkPermissionEdit={true}
        />
      </Form>
    </div>
  );
};

export default CustomsQuotation;
