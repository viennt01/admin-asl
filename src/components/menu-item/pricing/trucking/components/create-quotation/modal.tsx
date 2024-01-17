import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  Checkbox,
} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { createQuotationWithPricing } from '../../fetcher';
import { API_MESSAGE } from '@/constant/message';
import { useRouter } from 'next/router';
import { errorToast, successToast } from '@/hook/toast';
import {
  RequireCreateQuotationWithPricing,
  RequireCreateQuotationWithPricingFormValue,
} from '../../interface';
import { STATUS_ALL_LABELS } from '@/constant/form';
import ContainerType from './table-container';
import UnitProfit from './table-unit';
import style from './index.module.scss';
import LoadCapacityProfit from './table-load-capacity';
import { getAllCustomer } from '../../../sea/fetcher';
import SaleLead from './sale-lead';

export interface ImportFormValues {
  file: FileList;
}

interface ImportModalProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  itemData: React.Key[];
}
const dateFormat = 'YYYY-MM-DD';

export interface DataType {
  key: React.Key;
  containerName: string;
  profitRate: string;
}

export interface DataTypeProfit {
  key: React.Key;
  unitName: string;
  profitRate: string;
}

export interface DataTypeLoadCapacity {
  key: React.Key;
  loadCapacityName: string;
  profitRate: string;
}

const CreateQuotationModal: React.FC<ImportModalProps> = ({
  open,
  handleOk,
  handleCancel,
  itemData,
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const onOke = () => form.submit();
  const onCancel = () => handleCancel();
  const idPartners = Form.useWatch('salesLeadsQuotationRegisters', form);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  useEffect(() => {
    form.setFieldValue('forNewUser', componentDisabled);
  }, [componentDisabled]);

  const [dataSource, setDataSource] = useState<DataType[]>([
    { key: 'Other', containerName: 'Other', profitRate: '0' },
  ]);
  const [dataSourceProfit, setDataSourceProfit] = useState<DataTypeProfit[]>([
    { key: 'Other', unitName: 'Other', profitRate: '0' },
  ]);
  const [dataSourceLoadCapacity, setDataSourceLoadCapacity] = useState<
    DataTypeLoadCapacity[]
  >([{ key: 'Other', loadCapacityName: 'Other', profitRate: '0' }]);

  const getPartner = useQuery({
    queryKey: [API_PARTNER.GET_ALL_CUSTOMER],
    queryFn: () => getAllCustomer(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: RequireCreateQuotationWithPricing) => {
      return createQuotationWithPricing(body);
    },
  });

  const onSubmit = (value: RequireCreateQuotationWithPricingFormValue) => {
    const profitRateOfContainerTypeFilter = dataSource.filter(
      (item) =>
        item.profitRate !== '' &&
        item.profitRate !== '0' &&
        item.key !== 'Other' &&
        item.key !== 'profitRateOfLCL' &&
        item.key !== 'profitRateOfLCLMin'
    );
    const profitRateOfContainerType = profitRateOfContainerTypeFilter.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result: any, item) => {
        const key = String(item.key);
        result[key] = item.profitRate;
        return result;
      },
      {}
    );

    const profitRateOfLoadCapacityFilter = dataSourceLoadCapacity.filter(
      (item) =>
        item.profitRate !== '' &&
        item.profitRate !== '0' &&
        item.key !== 'Other'
    );
    const profitRateOfLoadCapacity = profitRateOfLoadCapacityFilter.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result: any, item) => {
        const key = String(item.key);
        result[key] = item.profitRate;
        return result;
      },
      {}
    );

    const profitRateOfUnitforFeeFilter = dataSourceProfit.filter(
      (item) =>
        item.profitRate !== '' &&
        item.profitRate !== '0' &&
        item.key !== 'Other'
    );
    const profitRateOfUnitforFee = profitRateOfUnitforFeeFilter.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result: any, item) => {
        const key = String(item.key);
        result[key] = item.profitRate;
        return result;
      },
      {}
    );
    // Biến đổi dữ liệu salesLeadsQuotationRegisters
    const salesLeadsQuotationRegisters =
      value?.salesLeadsQuotationRegisters?.map((id) => ({ partnerID: id })) ||
      [];
    // Biến đổi dữ liệu seaQuotationGroupPartnerRegisterRequests
    const seaQuotationGroupPartnerRegisterRequests =
      value?.seaQuotationGroupPartnerRegisterRequests?.map((id) => ({
        groupPartnerID: id,
      })) || [];

    const _requestData = {
      truckingPricingID: itemData,
      effectDated: value.effectDated.valueOf(),
      validityDate: value.validityDate.valueOf(),
      forNewUser: value.forNewUser,
      salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
      seaQuotationGroupPartnerRegisterRequests:
        seaQuotationGroupPartnerRegisterRequests,
      profitRateOfPricing:
        dataSource.find((item) => item.key === 'Other')?.profitRate || '0',
      profitRateOfLCL:
        dataSource.find((item) => item.key === 'profitRateOfLCL')?.profitRate ||
        '0',
      profitRateOfLCLMin:
        dataSource.find((item) => item.key === 'profitRateOfLCLMin')
          ?.profitRate || '0',
      profitRateOfFee:
        dataSourceProfit.find((item) => item.key === 'Other')?.profitRate ||
        '0',
      profitRateOfAllLoadCapacity:
        dataSourceLoadCapacity.find((item) => item.key === 'Other')
          ?.profitRate || '0',
      profitRateOfContainerType: profitRateOfContainerType,
      profitRateOfLoadCapacity: profitRateOfLoadCapacity,
      profitRateOfUnitforFee: profitRateOfUnitforFee,
      status: STATUS_ALL_LABELS.REQUEST,
    };

    createMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message), handleOk())
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <Modal
      title="Create quotation"
      className={style.modal_container}
      open={open}
      onOk={onOke}
      onCancel={onCancel}
      width={1300}
      footer={[
        <Row key="back">
          <Button onClick={onCancel} loading={createMutation.isLoading}>
            Cancel
          </Button>
          <Button type="primary" onClick={onOke}>
            Create
          </Button>
        </Row>,
      ]}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={24} style={{ margin: 0 }}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Effective date"
                  name="effectDated"
                  rules={[
                    {
                      required: true,
                      message: 'Please select effective date',
                    },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    style={{ width: '100%' }}
                    placeholder="Select effective date"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Expire date"
                  name="validityDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please select expire date',
                    },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    style={{ width: '100%' }}
                    placeholder="Select expire date"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="forNewUser">
                  <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                  >
                    Public
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={'Customer'}
                  name="salesLeadsQuotationRegisters"
                  // rules={[
                  //   {
                  //     required: checkObject?.includes('Customer'),
                  //     message: 'Please select customer',
                  //   },
                  // ]}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Select customer"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={
                      getPartner.data?.data.map((item) => {
                        return {
                          value: item.partnerID,
                          label: item.companyName,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <SaleLead idPartners={idPartners} />
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <ContainerType
              dataSource={dataSource}
              setDataSource={setDataSource}
            />
          </Col>
          <Col span={4}>
            <LoadCapacityProfit
              dataSourceProfit={dataSourceLoadCapacity}
              setDataSourceProfit={setDataSourceLoadCapacity}
            />
          </Col>
          <Col span={4}>
            <UnitProfit
              dataSourceProfit={dataSourceProfit}
              setDataSourceProfit={setDataSourceProfit}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateQuotationModal;
