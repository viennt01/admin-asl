import React, { Ref, useContext, useEffect, useRef, useState } from 'react';
import { Form, Table, InputNumber, InputRef, FormInstance } from 'antd';
import { formatNumber } from '@/utils/format';
import { DataTypeProfit } from './modal';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { API_MESSAGE } from '@/constant/message';
import { errorToast } from '@/hook/toast';
import { getListTypeUnit } from '@/components/menu-item/master-data/fee-catalog/fee/fetcher';
import { API_UNIT } from '@/fetcherAxios/endpoint';
export interface ImportFormValues {
  file: FileList;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportModalProps {
  dataSourceProfit: DataTypeProfit[];
  setDataSourceProfit: any;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: React.Key;
  type: string;
  profitRate: string;
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
  type: string;
  profitRate: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const UnitProfit: React.FC<ImportModalProps> = ({
  dataSourceProfit,
  setDataSourceProfit,
}) => {
  const router = useRouter();
  // get container type
  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        const newData = data.data.map((unit) => ({
          key: unit.unitID,
          unitName: unit.internationalCode,
          profitRate: '',
        }));
        setDataSourceProfit((prevData: any) => [...newData, ...prevData]);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Profit Other Charges',
      dataIndex: 'unitName',
      key: 'unitName',
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

  const handleSave = (row: DataType) => {
    const newData = [...dataSourceProfit];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceProfit(newData);
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
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSourceProfit}
      columns={columns as ColumnTypes}
      pagination={{
        pageSize: 15,
      }}
    />
  );
};

export default UnitProfit;
