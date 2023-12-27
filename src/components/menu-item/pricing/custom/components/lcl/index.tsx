import React, { Ref, useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Form, InputNumber, Table, Typography } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { formatNumber } from '@/utils/format';
import { IFormValues } from '../../interface';

interface PropsLCL {
  form: FormInstance<IFormValues>;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  priceName: string;
  priceColor: string;
}

interface EditableRowProps {
  index: number;
}

const { Text } = Typography;

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
            required: title === 'VAT' ? false : true,
            message: `${
              React.isValidElement(title)
                ? (title as React.ReactElement).props.children
                : title
            } is required.`,
          },
        ]}
      >
        <InputNumber
          ref={inputRef as unknown as Ref<HTMLInputElement>}
          onPressEnter={save}
          onBlur={save}
          style={{ width: '100%' }}
          formatter={(value) => formatNumber(value || '0')}
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
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
  vatCustomPricing: string;
}

const initialValue = {
  priceRedLane: '0',
  priceYellowLane: '0',
  priceGreenLane: '0',
  vatCustomPricing: '',
};

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const LCL = ({ form }: PropsLCL) => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 1,
      priceRedLane: initialValue.priceRedLane,
      priceYellowLane: initialValue.priceYellowLane,
      priceGreenLane: initialValue.priceGreenLane,
      vatCustomPricing: initialValue.vatCustomPricing,
    },
  ]);
  const dataRequestPricingLCL = Form.useWatch(
    'customPricingLCLDetailDTO',
    form
  );

  useEffect(() => {
    if (dataRequestPricingLCL) {
      setDataSource([
        {
          key: 1,
          priceRedLane: dataRequestPricingLCL.priceRedLane,
          priceYellowLane: dataRequestPricingLCL.priceYellowLane,
          priceGreenLane: dataRequestPricingLCL.priceGreenLane,
          vatCustomPricing: dataRequestPricingLCL.vatCustomPricing,
        },
      ]);
    }
  }, [dataRequestPricingLCL]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: <Text style={{ color: 'green' }}>Price Green</Text>,
      dataIndex: 'priceGreenLane',
      width: '25%',
      align: 'center',
      editable: true,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Price Yellow</Text>,
      dataIndex: 'priceYellowLane',
      width: '25%',
      align: 'center',
      editable: true,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Price Red</Text>,
      dataIndex: 'priceRedLane',
      width: '25%',
      align: 'center',
      editable: true,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: 'VAT',
      dataIndex: 'vatCustomPricing',
      width: '25%',
      editable: true,
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value)) === '0'
          ? '-'
          : formatNumber(Number(value));
      },
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
    form.setFieldValue('customPricingLCLDetailDTO', newData[0]);
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
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
    </div>
  );
};

export default LCL;
