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
import UnitProfit from './table-unit-profit';
import style from './index.module.scss';
import SaleLead from './sale-lead';
import { getAllCustomer } from '../../../sea/fetcher';

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
    const profitRateOfLoadCapacityTypeFilter = dataSource.filter(
      (item) =>
        item.profitRate !== '' &&
        item.profitRate !== '0' &&
        item.key !== 'Other'
    );
    const profitRateOfLoadCapacityType =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      profitRateOfLoadCapacityTypeFilter.reduce((result: any, item) => {
        const key = String(item.key); // Chuyển đổi key thành string
        result[key] = item.profitRate;
        return result;
      }, {});

    const profitRateOfUnitforFeeFilter = dataSourceProfit.filter(
      (item) =>
        item.profitRate !== '' &&
        item.profitRate !== '0' &&
        item.key !== 'Other'
    );
    const profitRateOfUnitforFee = profitRateOfUnitforFeeFilter.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result: any, item) => {
        const key = String(item.key); // Chuyển đổi key thành string
        result[key] = item.profitRate;
        return result;
      },
      {}
    );
    // Biến đổi dữ liệu salesLeadsQuotationRegisters
    const salesLeadsQuotationRegisters =
      value?.salesLeadsQuotationRegisters?.map((id) => ({ partnerID: id })) ||
      [];

    const _requestData = {
      airPricingID: itemData,
      effectDated: value.effectDated.valueOf(),
      validityDate: value.validityDate.valueOf(),
      forNewUser: value.forNewUser,
      salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
      profitRateOfLoadCapacityForAll:
        dataSource.find((item) => item.key === 'Other')?.profitRate || '0',
      profitRateOfFee:
        dataSourceProfit.find((item) => item.key === 'Other')?.profitRate ||
        '0',
      profitRateOfLoadCapacity: profitRateOfLoadCapacityType,
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
          <Col span={10}>
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
          <Col span={7}>
            <ContainerType
              dataSource={dataSource}
              setDataSource={setDataSource}
            />
          </Col>
          <Col span={7}>
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
