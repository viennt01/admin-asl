import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { FormValues, SeaPricingDetailDTOsFormValue } from '../interface';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  containerTypeCode: string;
  containerTypeID: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  //   console.log('EditableRow', form.getFieldsValue());

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
      console.log({ ...record, ...values });

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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
  containerTypeCode: string;
  containerTypeID: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
  //   seaPricingDetailID: '5e7212f3-d873-49a4-8058-07cae2ec9d12';
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  form: FormInstance<FormValues>;
}

const SeaPricingDetailDTO = ({ form }: Props) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    if (form.getFieldValue('seaPricingDetailDTOs')) {
      setDataSource(
        form
          .getFieldValue('seaPricingDetailDTOs')
          .map((item: SeaPricingDetailDTOsFormValue) => {
            return {
              key: item.seaPricingDetailID,
              containerTypeCode: item.containerTypeCode,
              containerTypeID: item.containerTypeID,
              containerTypeName: item.containerTypeName,
              currencyID: item.currencyID,
              currencyName: item.currencyName,
              price: item.price,
            };
          })
      );
    }
  }, [form.getFieldValue('seaPricingDetailDTOs')]);

  const [count, setCount] = useState(2);
  console.log(
    'seaPricingDetailDTOs',
    form
      .getFieldValue('seaPricingDetailDTOs')
      .map((item: SeaPricingDetailDTOsFormValue) => {
        return {
          key: item.seaPricingDetailID,
          containerTypeCode: item.containerTypeCode,
          containerTypeID: item.containerTypeID,
          containerTypeName: item.containerTypeName,
          currencyID: item.currencyID,
          currencyName: item.currencyName,
          price: item.price,
        };
      })
  );

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Type container',
      dataIndex: 'containerTypeCode',
      width: '30%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Currency',
      dataIndex: 'currencyName',
    },
    {
      title: 'operation',
      dataIndex: 'key',
      render: (value) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(value)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      containerTypeCode: 'BOXES',
      containerTypeID: 'a0555191-7312-43ab-91a9-ff16207f0e86',
      containerTypeName: 'BOXES',
      currencyID: 'null',
      currencyName: 'null',
      price: 'null',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

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
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default SeaPricingDetailDTO;
