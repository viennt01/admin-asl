import React, {
  Dispatch,
  Ref,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { InputRef } from 'antd';
import { Form, InputNumber, Table, Tag } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { formatNumber } from '@/utils/format';
import {
  ICustomPricingLCLAndAirDetailRegisterRequests,
  RequireColorRouter,
} from '../../interface';

interface PropsLCL {
  dataColorRouter: RequireColorRouter[];
  setDataLCLSea: Dispatch<
    SetStateAction<ICustomPricingLCLAndAirDetailRegisterRequests[]>
  >;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  colorRouterID: string;
  priceColorRouter: string;
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
  colorRouterID: string;
  priceColorRouter: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const LCL = ({ dataColorRouter, setDataLCLSea }: PropsLCL) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  console.log(dataSource);

  useEffect(() => {
    setDataSource(
      dataColorRouter.map((item) => ({
        key: item.colorRouterID,
        colorRouterID: item.colorRouterName,
        priceColorRouter: '0',
      }))
    );
    setDataLCLSea(
      dataColorRouter.map((item) => ({
        colorRouterID: item.colorRouterID,
        priceColorRouter: '0',
      }))
    );
  }, [dataColorRouter]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Price Color',
      dataIndex: 'colorRouterID',
      width: '50%',
      align: 'center',
      render: (value) => {
        return <Tag color={value?.split(' ')[0].toLowerCase()}>{value}</Tag>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'priceColorRouter',
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
    setDataSource(newData);
    setDataLCLSea(
      newData.map((item) => ({
        colorRouterID: item.key,
        priceColorRouter: item.priceColorRouter,
      }))
    );
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
