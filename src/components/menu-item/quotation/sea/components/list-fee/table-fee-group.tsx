import { Form, Table, InputRef, InputNumber } from 'antd';
import React, { Ref, useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { formatNumber } from '@/utils/format';
import { ISeaQuotationFeeDTOs } from '../../interface';
interface ImportModalProps {
  dataTable: ISeaQuotationFeeDTOs[];
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

const TableFeeGroup: React.FC<ImportModalProps> = ({ dataTable }) => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      feeName: 'Edward King 0',
      unitInternationalCode: '32',
      priceFee: '1000',
      currencyName: 'London, Park Lane no. 0',
      vatFee: '1000',
    },
    {
      key: '1',
      feeName: 'Edward King 0',
      unitInternationalCode: '32',
      priceFee: '1000',
      currencyName: 'London, Park Lane no. 0',
      vatFee: '1000',
    },
  ]);

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

  useEffect(() => {
    setDataSource(
      dataTable.map((item) => {
        return {
          key: item.feeGroupDetailID,
          feeName: item.feeName,
          unitInternationalCode: item.unitInternationalCode,
          priceFee: item.priceFee,
          currencyName: item.currencyName,
          vatFee: item.vatFee,
        };
      })
    );
  }, [dataTable]);

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </Form>
    </>
  );
};

export default TableFeeGroup;
