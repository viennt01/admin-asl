import { ROUTERS } from '@/constant/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  IFormValues,
  ITruckingPricingFeeFormValue,
  IUpdateStatus,
} from '../interface';
import {
  API_CONTAINER_TYPE,
  API_CURRENCY,
  API_FEE_GROUP,
  API_LOAD_CAPACITY,
  API_TRUCKING_PRICING,
} from '@/fetcherAxios/endpoint';
import { BottomCreateEdit } from '@/components/commons/bottom-edit-creat-manager';
import {
  getAllContainerType,
  getAllCurrency,
  getAllLoadCapacity,
  getTruckPricingDetail,
  updateStatus,
} from '../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import dayjs from 'dayjs';
import CardMain from './card-main';
import CollapseCard from '@/components/commons/collapse-card';
import SeaPricingDetailDTO from './container-detail';
import { getFeeWithFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import { FeeTable } from '@/components/menu-item/quotation/fee-group/interface';
import ListFee from './list-fee';
import TruckingPricingLoadCapacity from './load-capacity-pricing-detail-dto';
import { TYPE_LOAD_CAPACITY } from '../../air/interface';
import { ROLE } from '@/constant/permission';
import { AppContext } from '@/app-context';

interface PortFormProps {
  create?: boolean;
  manager?: boolean;
  edit?: boolean;
  handleSubmit?: (
    formValues: IFormValues,
    id?: string,
    truckingPricingFeeDTOs?: ITruckingPricingFeeFormValue[]
  ) => void;
  handleSaveDraft?: (
    formValues: IFormValues,
    id?: string,
    truckingPricingFeeDTOs?: ITruckingPricingFeeFormValue[]
  ) => void;
  loadingSubmit?: boolean;
  checkRow: boolean;
  useDraft?: boolean;
}

const TruckingPricingForm = ({
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
  const { role } = useContext(AppContext);
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
  const [truckingPricingFeeDTOs, setTruckingPricingFeeDTOs] = useState<
    ITruckingPricingFeeFormValue[]
  >([]);
  const [dataFeeTable, setDataFeeTable] = useState<FeeTable[]>([]);
  const listIdFeeGroup = Form.useWatch('truckingPricingFeeGroupDTOs', form);

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
  useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP, listIdFeeGroup],
    queryFn: () => getFeeWithFeeGroup({ id: listIdFeeGroup }),
    enabled: listIdFeeGroup !== undefined,
    onSuccess(data) {
      setDataFeeTable([]);
      if (data.status) {
        if (data.data) {
          setDataFeeTable(data.data);
        }
      }
    },
  });

  const onFinish = (formValues: IFormValues) => {
    if (idQuery) {
      handleSubmit && handleSubmit(formValues, idQuery, truckingPricingFeeDTOs);
    } else {
      handleSubmit && handleSubmit(formValues, '', truckingPricingFeeDTOs);
    }
  };

  const onSaveDraft = () => {
    if (idQuery) {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), idQuery, truckingPricingFeeDTOs);
    } else {
      handleSaveDraft &&
        handleSaveDraft(form.getFieldsValue(), '', truckingPricingFeeDTOs);
    }
  };

  const handleIdQuery = (id: string) => {
    setIdQuery(id as string);
  };

  const detailQuery = useQuery({
    queryKey: [API_TRUCKING_PRICING.GET_DETAIL, idQuery],
    queryFn: () => getTruckPricingDetail(idQuery as string),
    enabled: idQuery !== undefined,
    onSuccess: (data) => {
      if (data.status) {
        form.setFieldsValue({
          truckingPricingID: data.data.truckingPricingID,
          pickupID: data.data.pickupID,
          deliveryID: data.data.deliveryID,
          commodityID: data.data.commodityID,
          currencyID: data.data.currencyID,
          transitTimetruckingPricing: data.data.transitTimetruckingPricing,
          lclTruckingPricing: data.data.lclTruckingPricing,
          lclMinTruckingPricing: data.data.lclMinTruckingPricing,
          public: data.data.public,
          note: data.data.note,
          effectDated: dayjs(Number(data.data.effectDated)),
          validityDate: dayjs(Number(data.data.validityDate)),
          freqDate: data.data.freqDate,
          statusTruckingPricing: data.data.statusTruckingPricing,
          truckingPricingDetailByContainerTypeDTOs:
            data.data.truckingPricingDetailByContainerTypeDTOs,
          truckingPricingDetailByLoadCapacityDTOs:
            data.data.truckingPricingDetailByLoadCapacityDTOs,
          truckingPricingFeeGroupDTOs:
            data.data.truckingPricingFeeGroupDTOs?.map((fee) => fee.feeGroupID),
        });
        setTruckingPricingFeeDTOs(data.data.truckingPricingFeeGroupDTOs);
      } else {
        router.back();
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
            ? (successToast(data.message), router.back())
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
      pickupID: form.getFieldValue('pickupID'),
      deliveryID: form.getFieldValue('deliveryID'),
      emtyPickupID: form.getFieldValue('emtyPickupID'),
      commodityID: form.getFieldValue('commodityID'),
      currencyID: form.getFieldValue('currencyID'),
      public: form.getFieldValue('public'),
      transitTimetruckingPricing: form.getFieldValue(
        'transitTimetruckingPricing'
      ),
      note: form.getFieldValue('note'),
      effectDated: form.getFieldValue('effectDated')?.valueOf(),
      validityDate: form.getFieldValue('validityDate')?.valueOf(),
      freqDate: form.getFieldValue('freqDate'),
      lclMinTruckingPricing: form.getFieldValue('lclMinTruckingPricing'),
      lclTruckingPricing: form.getFieldValue('lclTruckingPricing'),
      statusTruckingPricing: form.getFieldValue('statusTruckingPricing'),
      truckingPricingDetailByContainerTypeDTOs: JSON.stringify(
        form.getFieldValue('truckingPricingDetailByContainerTypeDTOs')
      ),
      truckingPricingDetailByLoadCapacityDTOs: JSON.stringify(
        form.getFieldValue('truckingPricingDetailByLoadCapacityDTOs')
      ),
      truckingPricingFeeGroupDTOs: form.getFieldValue(
        'truckingPricingFeeGroupDTOs'
      ),
    };
    router.push({
      pathname: ROUTERS.TRUCKING_PRICING_CREATE,
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
          title="Container"
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
          title="Truck"
          style={{ marginBottom: '24px' }}
          defaultActive={true}
        >
          <TruckingPricingLoadCapacity
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
          <ListFee FeeDataTable={dataFeeTable} />
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
          handleAR={
            role === ROLE.LINER || role === ROLE.AGENT ? undefined : handleAR
          }
          checkQuery={idQuery ? true : false}
          useDraft={useDraft}
          handleCopyAndCreate={handleCopyAndCreate}
          checkPermissionEdit={true}
        />
      </Form>
    </div>
  );
};

export default TruckingPricingForm;
