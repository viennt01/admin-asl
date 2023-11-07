import React, { useState } from 'react';
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
import {
  createQuotationWithPricing,
  getAllPartner,
  getAllPartnerGroup,
} from '../../fetcher';
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
import TableSaleLead from './table-sale-lead';
import style from './index.module.scss';

export interface ImportFormValues {
  file: FileList;
}

interface ImportModalProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  itemData: React.Key[];
}
const dateFormat = 'YYYY/MM/DD';

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
  const checkObject = Form.useWatch('checkbox-group', form);
  const idPartners = Form.useWatch('salesLeadsQuotationRegisters', form);

  const [dataSource, setDataSource] = useState<DataType[]>([
    { key: 'Other', containerName: 'Other', profitRate: '0' },
  ]);
  const [dataSourceProfit, setDataSourceProfit] = useState<DataTypeProfit[]>([
    { key: 'Other', unitName: 'Other', profitRate: '0' },
  ]);

  const getPartner = useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER],
    queryFn: () => getAllPartner(),
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
  const getPartnerGroup = useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_GROUP],
    queryFn: () => getAllPartnerGroup(),
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
        item.key !== 'Other'
    );
    const profitRateOfContainerType = profitRateOfContainerTypeFilter.reduce(
      (result: any, item) => {
        result[item.key] = item.profitRate;
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
      (result: any, item) => {
        result[item.key] = item.profitRate;
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
      seaPricingID: itemData,
      effectDated: value.effectDated.valueOf(),
      validityDate: value.validityDate.valueOf(),
      salesLeadsQuotationRegisters: salesLeadsQuotationRegisters,
      seaQuotationGroupPartnerRegisterRequests:
        seaQuotationGroupPartnerRegisterRequests,
      profitRateOfPricing:
        dataSource.find((item) => item.key === 'Other')?.profitRate || '0',
      profitRateOfFee:
        dataSourceProfit.find((item) => item.key === 'Other')?.profitRate ||
        '0',
      profitRateOfContainerType: profitRateOfContainerType,
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
          <Col span={8}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Effect date"
                  name="effectDated"
                  rules={[
                    {
                      required: true,
                      message: 'Please select effect date',
                    },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    style={{ width: '100%' }}
                    placeholder="Select effect date"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Validity date"
                  name="validityDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please select validity date',
                    },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    style={{ width: '100%' }}
                    placeholder="Select validity date"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="checkbox-group"
                  label="Object"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose an object',
                    },
                  ]}
                >
                  <Checkbox.Group>
                    <Row>
                      <Col span={14}>
                        <Checkbox
                          value="Customer"
                          style={{ lineHeight: '32px' }}
                        >
                          Customer
                        </Checkbox>
                      </Col>
                      <Col span={10}>
                        <Checkbox value="Group" style={{ lineHeight: '32px' }}>
                          Group
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>

              <Col span={checkObject?.includes('Group') ? 24 : 0}>
                <Form.Item
                  label={'Group'}
                  name="seaQuotationGroupPartnerRegisterRequests"
                  rules={[
                    {
                      required: checkObject?.includes('Group'),
                      message: 'Please select group',
                    },
                  ]}
                >
                  <Select
                    disabled={!checkObject?.includes('Group')}
                    showSearch
                    mode="multiple"
                    placeholder="Select group"
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
                      getPartnerGroup.data?.data.map((item) => {
                        return {
                          value: item.groupPartnerID,
                          label: item.abbreviations,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={checkObject?.includes('Customer') ? 24 : 0}>
                <Form.Item
                  label={'Customer'}
                  name="salesLeadsQuotationRegisters"
                  rules={[
                    {
                      required: checkObject?.includes('Customer'),
                      message: 'Please select customer',
                    },
                  ]}
                >
                  <Select
                    disabled={!checkObject?.includes('Customer')}
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
                          label: item.name,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={checkObject?.includes('Customer') ? 24 : 0}>
                <TableSaleLead idPartners={idPartners} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <ContainerType
              dataSource={dataSource}
              setDataSource={setDataSource}
            />
          </Col>
          <Col span={8}>
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
