import React, { Ref, useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Row,
  Table,
  InputNumber,
  InputRef,
  FormInstance,
  Col,
  DatePicker,
} from 'antd';
import { formatNumber } from '@/utils/format';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_CONTAINER_TYPE } from '@/fetcherAxios/endpoint';
import { createQuotationWithPricing, getAllContainerType } from '../../fetcher';
import { API_MESSAGE } from '@/constant/message';
import { useRouter } from 'next/router';
import { errorToast, successToast } from '@/hook/toast';
import { RequireCreateQuotationWithPricing } from '../../interface';
import { STATUS_ALL_LABELS } from '@/constant/form';
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

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  feeName: string;
  unitInternationalCode: string;
  priceFee: string;
  currencyName: string;
  vatFee: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <InputNumber
          ref={inputRef as unknown as Ref<HTMLInputElement>}
          onPressEnter={save}
          onBlur={save}
          style={{ width: '100%' }}
          formatter={(value) => formatNumber(Number(value) || 0)}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  containerName: string;
  profitRate: string;
}

interface DataTypeProfit {
  key: React.Key;
  type: string;
  profitRate: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

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

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // get container type
  useQuery({
    queryKey: [API_CONTAINER_TYPE.GET_ALL],
    queryFn: () => getAllContainerType(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setDataSource(
          data.data.map((currency) => {
            return {
              key: currency.containerTypeID,
              containerName: currency.code,
              profitRate: '',
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

  const createMutation = useMutation({
    mutationFn: (body: RequireCreateQuotationWithPricing) => {
      return createQuotationWithPricing(body);
    },
  });

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Name',
      dataIndex: 'containerName',
      key: 'containerName',
      fixed: 'left',
    },
    {
      title: 'Profit Rate',
      dataIndex: 'profitRate',
      key: 'profitRate',
      fixed: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
      editable: true,
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  //----------------------------------------------------------------
  const [dataSourceProfit, setDataSourceProfit] = useState<DataTypeProfit[]>([
    { key: 'profitRateOfPricing', type: 'Freight Profit', profitRate: '0' },
    { key: 'profitRateOfFee', type: 'Other Fee Profit', profitRate: '0' },
  ]);

  const defaultColumnsProfit: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      fixed: 'left',
    },
    {
      title: '%',
      dataIndex: 'profitRate',
      key: 'profitRate',
      fixed: 'right',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
      editable: true,
    },
  ];

  const handleSaveProfit = (row: DataTypeProfit) => {
    const newData = [...dataSourceProfit];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceProfit(newData);
  };

  const componentsProfit = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columnsProfit = defaultColumnsProfit.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSaveProfit,
      }),
    };
  });

  const onSubmit = (value: RequireCreateQuotationWithPricing) => {
    const profitRateOfContainerTypeFilter = dataSource.filter(
      (item) => item.profitRate !== '' && item.profitRate !== '0'
    );
    const profitRateOfContainerType = profitRateOfContainerTypeFilter.reduce(
      (result: any, item) => {
        result[item.key] = item.profitRate;
        return result;
      },
      {}
    );

    const _requestData = {
      seaPricingID: itemData,
      effectDated: value.effectDated.valueOf(),
      validityDate: value.validityDate.valueOf(),
      profitRateOfPricing: dataSourceProfit[0].profitRate,
      profitRateOfContainerType: profitRateOfContainerType,
      profitRateOfFee: dataSourceProfit[1].profitRate,
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
      open={open}
      onOk={onOke}
      onCancel={onCancel}
      width={700}
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
        <Row gutter={24}>
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
            </Row>
          </Col>
          <Col span={8}>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
            />
          </Col>
          <Col span={8}>
            <Table
              components={componentsProfit}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSourceProfit}
              columns={columnsProfit as ColumnTypes}
              pagination={false}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateQuotationModal;
