import {
  Button,
  Modal,
  Form,
  Row,
  Table,
  InputRef,
  InputNumber,
  Col,
  Select,
} from 'antd';
import COLORS from '@/constant/color';
import useI18n from '@/i18n/useI18N';
import { PlusOutlined } from '@ant-design/icons';
import React, { Ref, useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { formatNumber } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import { getAllFeeGroup } from '../../fetcher';
import { getFeeWithFeeGroup } from '@/components/menu-item/master-data/fee-group/fetcher';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportModalProps {
  add: () => void;
  idActive: string[];
}

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
  feeName: string;
  unitInternationalCode: string;
  priceFee: string;
  currencyName: string;
  vatFee: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const AddFeeModal: React.FC<ImportModalProps> = ({ add, idActive }) => {
  const [form] = Form.useForm();
  const onOke = () => form.submit();
  const { translate: translateCommon } = useI18n('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const getFeeGroup = useQuery([API_FEE_GROUP.GET_ALL], getAllFeeGroup);

  const idFeeGroupSelect = Form.useWatch('feeGroupID', form);

  useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP, idFeeGroupSelect],
    queryFn: () => getFeeWithFeeGroup({ id: [idFeeGroupSelect] }),
    enabled: idFeeGroupSelect !== undefined,
    onSuccess(data) {
      if (data.status) {
        if (data.data) {
          setDataSource(
            data.data.map((item) => {
              return {
                key: item.feeID,
                feeName: item.feeName,
                unitInternationalCode: item.unitInternationalCode,
                priceFee: item.priceFeeGroup,
                currencyName: item.currencyName,
                vatFee: item.vatFeeGroup,
              };
            })
          );
        }
      }
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    add();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Name',
      dataIndex: 'feeName',
      key: 'feeName',
      fixed: 'left',
    },
    {
      title: 'Unit',
      dataIndex: 'unitInternationalCode',
      key: 'unitInternationalCode',
      fixed: 'left',
    },
    {
      title: 'Price',
      dataIndex: 'priceFee',
      key: 'priceFee',
      fixed: 'right',
      render: (value) => {
        return value ? formatNumber(Number(value) || 0) : '-';
      },
      editable: true,
    },
    {
      title: 'Currency',
      dataIndex: 'currencyName',
      key: 'currencyName',
      fixed: 'left',
    },
    {
      title: 'VAT',
      dataIndex: 'vatFee',
      key: 'vatFee',
      fixed: 'right',
      render: (value) => {
        return value ? formatNumber(Number(value) || 0) : '-';
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
  return (
    <>
      <Button
        icon={<PlusOutlined />}
        style={{
          backgroundColor: COLORS.BRIGHT,
          color: COLORS.GREEN,
          borderColor: COLORS.GREEN,
          fontWeight: '500',
          float: 'right',
        }}
        // disabled={isCheckPermissionEdit}
        onClick={showModal}
      >
        {translateCommon('button_add')}
      </Button>
      <Modal
        title="Add other charges"
        open={isModalOpen}
        onOk={onOke}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Row key="back">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={onOke}>
              Ok
            </Button>
          </Row>,
        ]}
      >
        <Row>
          <Col span={24}>
            <Form form={form} component={false} onFinish={handleOk}>
              <Form.Item name="feeGroupID">
                <Select
                  showSearch
                  placeholder={'Select Fee Group'}
                  optionFilterProp="children"
                  size="middle"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    getFeeGroup.data?.data
                      .map((item) => {
                        return {
                          value: item.feeGroupID,
                          label: item.feeGroupName,
                        };
                      })
                      .filter((itemB) => !idActive.includes(itemB.value)) || []
                  }
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={24}>
            <Table
              style={{ display: idFeeGroupSelect ? '' : 'none' }}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddFeeModal;
