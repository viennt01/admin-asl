import React, { Ref, useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Form, InputNumber, Table, Tag } from 'antd';
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
          formatter={(value) => formatNumber(value || 0)}
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
  priceName: string;
  priceColor: string;
}

const initialValue = {
  priceRedLane: '0',
  priceYellowLane: '0',
  priceGreenLane: '0',
};
type AccType = Record<string, string>;

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const LCL = ({ form }: PropsLCL) => {
  const [isMounted, setIsMounted] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 1,
      priceName: 'Green',
      priceColor: initialValue.priceGreenLane,
    },
    {
      key: 2,
      priceName: 'Yellow',
      priceColor: initialValue.priceYellowLane,
    },
    {
      key: 3,
      priceName: 'Red',
      priceColor: initialValue.priceRedLane,
    },
  ]);
  const dataRequestQuotationLCL = Form.useWatch(
    'customQuotationLCLDetailDTO',
    form
  );
  console.log('dataSource', dataSource);
  console.log('dataRequestPricingLCL', dataRequestQuotationLCL);

  useEffect(() => {
    if (dataRequestQuotationLCL) {
      setDataSource([
        {
          key: 1,
          priceName: 'Green',
          priceColor: dataRequestQuotationLCL.priceGreenLane,
        },
        {
          key: 2,
          priceName: 'Yellow',
          priceColor: dataRequestQuotationLCL.priceYellowLane,
        },
        {
          key: 3,
          priceName: 'Red',
          priceColor: dataRequestQuotationLCL.priceRedLane,
        },
      ]);
    }
    if (!isMounted) {
      setIsMounted(true);
      const resultObject = dataSource.reduce<AccType>((acc, item) => {
        const { priceName, priceColor } = item;
        acc['price' + priceName + 'Lane'] = priceColor;
        if (dataRequestQuotationLCL?.customQuotationLCLDetailID) {
          acc['customQuotationLCLDetailID'] =
            dataRequestQuotationLCL.customQuotationLCLDetailID || '';
        }
        return acc;
      }, {});
      form.setFieldValue('customQuotationLCLDetailDTO', resultObject);
    }
  }, [dataRequestQuotationLCL]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Price Color',
      dataIndex: 'priceName',
      width: '50%',
      align: 'center',
      render: (value) => {
        return <Tag color={value?.toLowerCase()}>{value}</Tag>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'priceColor',
      width: '50%',
      editable: true,
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
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

    const resultObject = newData.reduce<AccType>((acc, item) => {
      const { priceName, priceColor } = item;
      acc['price' + priceName + 'Lane'] = priceColor;
      if (dataRequestQuotationLCL.customQuotationLCLDetailID) {
        acc['customQuotationLCLDetailID'] =
          dataRequestQuotationLCL?.customQuotationLCLDetailID || '';
      }
      return acc;
    }, {});
    form.setFieldValue('customQuotationLCLDetailDTO', resultObject);
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
