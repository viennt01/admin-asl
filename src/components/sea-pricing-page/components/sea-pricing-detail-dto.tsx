import React, {
  Ref,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
  Key,
} from 'react';
import { Button, Form, InputNumber, Popconfirm, Select, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { FormValues, SeaPricingDetailDTOsFormValue } from '../interface';
import type { BaseSelectRef } from 'rc-select';
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
  inputType: 'number' | 'selectCurrency' | 'selectContainerType';
  optionCurrency: { value: string; label: string }[];
  optionTypeContainer: { value: string; label: string }[];
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  inputType,
  children,
  optionCurrency,
  optionTypeContainer,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef() as MutableRefObject<BaseSelectRef>;
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
  const inputNode =
    inputType === 'number' ? (
      <InputNumber
        ref={inputRef as unknown as Ref<HTMLInputElement>}
        onPressEnter={save}
        onBlur={save}
      />
    ) : inputType === 'selectCurrency' ? (
      <Select
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
        style={{ width: '100%' }}
        onBlur={save}
        options={optionCurrency}
      />
    ) : (
      <Select
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
        style={{ width: '100%' }}
        onBlur={save}
        options={optionTypeContainer}
      />
    );
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
        {inputNode}
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
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  form: FormInstance<FormValues>;
  edit?: boolean;
  optionCurrency: { value: string; label: string }[];
  optionTypeContainer: { value: string; label: string }[];
}

const SeaPricingDetailDTO = ({
  form,
  edit,
  optionCurrency,
  optionTypeContainer,
}: Props) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataRequire, setDataRequire] = useState<DataType[]>([]);
  const [optionTypeContainerActive, setOptionTypeContainerActive] = useState<
    { value: string; label: string }[]
  >([]);
  const [idKeyAndContainerType, setIdKeyAndContainerType] = useState<
    { idSeaPricingDetailID: Key; idContainerType: string }[]
  >([]);
  const [countLoadData, setCountLoadData] = useState(0);
  useEffect(() => {
    if (form.getFieldValue('seaPricingDetailDTOs') && countLoadData === 0) {
      setDataRequire(
        form
          .getFieldValue('seaPricingDetailDTOs')
          .map((item: SeaPricingDetailDTOsFormValue) => {
            return {
              key: item.seaPricingDetailID || '',
              containerTypeCode: item.containerTypeCode || '',
              containerTypeID: item.containerTypeID || '',
              containerTypeName: item.containerTypeName || '',
              currencyID: item.currencyID || '',
              currencyName: item.currencyName || '',
              price: item.price || '',
            };
          })
      );
      setDataSource(dataRequire.filter((itemA) => itemA.currencyID !== ''));
      edit
        ? form.setFieldValue(
            'seaPricingDetailDTOs',
            dataSource.map((item) => {
              return {
                seaPricingDetailID: item.key,
                containerTypeID: item.containerTypeID,
                currencyID: item.currencyID,
                price: item.price,
              };
            })
          )
        : form.setFieldValue(
            'seaPricingDetailDTOs',
            dataSource.map((item) => {
              return {
                containerTypeID: item.containerTypeID,
                currencyID: item.currencyID,
                priceSeaPricingDetail: item.price,
              };
            })
          );
      setCountLoadData(1);
    }
  }, [form.getFieldValue('seaPricingDetailDTOs')]);
  // console.log('dataRequire', dataRequire);

  useEffect(() => {
    setOptionTypeContainerActive(
      optionTypeContainer.filter(
        (itemB) =>
          !dataSource.some(
            (itemA) =>
              itemA.containerTypeID === itemB.value && itemA.currencyID !== ''
          )
      )
    );
    setIdKeyAndContainerType(
      dataRequire.map((item) => {
        return {
          idSeaPricingDetailID: item.key,
          idContainerType: item.containerTypeID,
        };
      })
    );
    // setDataSource(dataRequire.filter((itemA) => itemA.currencyID !== ''));
    // form.setFieldValue('seaPricingDetailDTOs', dataSource);
  }, [optionCurrency, dataRequire]);
  console.log(idKeyAndContainerType);
  console.log(
    idKeyAndContainerType.find(
      (item) => item.idContainerType === optionTypeContainerActive[0]?.value
    )?.idSeaPricingDetailID
  );

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    const itemDelete = dataSource.filter((item) => item.key == key);
    setOptionTypeContainerActive([
      {
        value: itemDelete[0].containerTypeID,
        label: itemDelete[0].containerTypeName,
      },
      ...optionTypeContainerActive,
    ]);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Type container',
      dataIndex: 'containerTypeID',
      width: '30%',
      editable: true,
      render: (value) => {
        return optionTypeContainer.find((item) => item.value === value)?.label;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
    },
    {
      title: 'Currency',
      dataIndex: 'currencyID',
      editable: true,
      render: (value) => {
        return optionCurrency.find((item) => item.value === value)?.label;
      },
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
      key:
        idKeyAndContainerType.find(
          (item) => item.idContainerType === optionTypeContainerActive[0]?.value
        )?.idSeaPricingDetailID || '',
      containerTypeCode: '',
      containerTypeID: optionTypeContainerActive[0]?.value || '',
      containerTypeName: optionTypeContainerActive[0].label || '',
      currencyID: optionCurrency[0].value || '',
      currencyName: optionCurrency[0].label || '',
      price: '1000000',
    };
    setDataSource([newData, ...dataSource]);
    if (optionTypeContainerActive.length > 0) {
      setOptionTypeContainerActive(optionTypeContainerActive.slice(1));
    }
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
    setOptionTypeContainerActive(
      optionTypeContainer.filter(
        (itemB) =>
          !newData.some(
            (itemA) =>
              itemA.containerTypeID === itemB.value && itemA.currencyID !== ''
          )
      )
    );
    setDataSource(newData);
    edit
      ? form.setFieldValue(
          'seaPricingDetailDTOs',
          dataSource.map((item) => {
            return {
              seaPricingDetailID: item.key,
              containerTypeID: item.containerTypeID,
              currencyID: item.currencyID,
              price: item.price,
            };
          })
        )
      : form.setFieldValue(
          'seaPricingDetailDTOs',
          dataSource.map((item) => {
            return {
              containerTypeID: item.containerTypeID,
              currencyID: item.currencyID,
              priceSeaPricingDetail: item.price,
            };
          })
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
        inputType:
          col.dataIndex === 'price'
            ? 'number'
            : col.dataIndex === 'currencyID'
            ? 'selectCurrency'
            : 'selectContainerType',
        optionCurrency: optionCurrency,
        optionTypeContainer: optionTypeContainerActive,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
          display: optionTypeContainerActive.length === 0 ? 'none' : '',
        }}
      >
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
