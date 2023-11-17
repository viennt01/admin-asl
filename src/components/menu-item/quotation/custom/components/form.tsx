import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react';
import {
  IFormValues,
  ISeaQuotationFeeFormValue,
  UpdateStatus,
} from '../interface';
import { API_CURRENCY, API_CUSTOMS_QUOTATION } from '@/fetcherAxios/endpoint';
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
import TableSaleLead from './table-sale-lead';

interface FormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: IFormValues,
    id?: string,
    seaQuotationFeeDTOs?: ISeaQuotationFeeFormValue[],
    selectedRowKeys?: Key[]
  ) => void;
  handleSaveDraft?: (
    formValues: IFormValues,
    id?: string,
    seaQuotationFeeDTOs?: ISeaQuotationFeeFormValue[],
    selectedRowKeys?: Key[]
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
  const [isCheckPermissionEdit, setCheckPermissionEdit] =
    useState<boolean>(false);
  const [optionCurrency, setOptionCurrency] = useState<
    { value: string; label: string }[]
  >([]);
  const [seaQuotationFeeDTOs, setSeaQuotationFeeDTOs] = useState<
    ISeaQuotationFeeFormValue[]
  >([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const idPartners = Form.useWatch('Customer', form);
  const idGroupPartner = Form.useWatch('groupPartner', form);

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

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit &&
        handleSubmit(formValues, idQuery, seaQuotationFeeDTOs, selectedRowKeys);
    } else {
      handleSubmit &&
        handleSubmit(formValues, '', seaQuotationFeeDTOs, selectedRowKeys);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          idQuery,
          seaQuotationFeeDTOs,
          selectedRowKeys
        );
    } else {
      handleSaveDraft &&
        handleSaveDraft(
          form.getFieldsValue(),
          '',
          seaQuotationFeeDTOs,
          selectedRowKeys
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
          customRedPrice: data.data.customRedPrice,
          customYellowPrice: data.data.customYellowPrice,
          customGreenPrice: data.data.customGreenPrice,
          effectDated: dayjs(Number(data.data.effectDated)),
          validityDate: dayjs(Number(data.data.validityDate)),
          public: data.data.public,
          statusCustomQuotation: data.data.statusCustomQuotation,
          customQuotationFeeGroupDTOs: data.data.customQuotationFeeGroupDTOs,
        });
        setSeaQuotationFeeDTOs(data.data.customQuotationFeeGroupDTOs);
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
      customRedPrice: form.getFieldValue('customRedPrice'),
      customYellowPrice: form.getFieldValue('customYellowPrice'),
      customGreenPrice: form.getFieldValue('customGreenPrice'),
      effectDated: form.getFieldValue('effectDated')?.valueOf(),
      validityDate: form.getFieldValue('validityDate')?.valueOf(),
      public: form.getFieldValue('public'),
      statusCustomQuotation: form.getFieldValue('statusCustomQuotation'),
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
          title="Customer"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <TableSaleLead
            idPartners={idPartners}
            idGroupPartner={idGroupPartner}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
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

export default CustomsQuotation;
