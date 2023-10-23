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
import { FormValues, AirPricingDetailDTOsFormValue } from '../interface';
import type { BaseSelectRef } from 'rc-select';
import COLORS from '@/constant/color';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useI18n from '@/i18n/useI18N';
import { formatNumber } from '@/utils/format';

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
  optionTypeContainerActive: { value: string; label: string }[];
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
  optionTypeContainerActive,
  optionTypeContainer,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef() as MutableRefObject<BaseSelectRef>;
  const form = useContext(EditableContext)!;
  const [optionTypeContainerSelected, setOptionTypeContainerSelect] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (optionTypeContainer) {
      const itemActive = optionTypeContainer.find(
        (item) => item.value === record.containerTypeID
      );
      setOptionTypeContainerSelect(
        itemActive
          ? [itemActive, ...optionTypeContainerActive]
          : optionTypeContainerActive
      );
    }
  }, [optionTypeContainer, optionTypeContainerActive, record?.containerTypeID]);

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
  const inputNode =
    inputType === 'number' ? (
      <InputNumber
        ref={inputRef as unknown as Ref<HTMLInputElement>}
        onPressEnter={save}
        onBlur={save}
        style={{ width: '100%' }}
        formatter={(value) => formatNumber(value || 0)}
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
        options={optionTypeContainerSelected}
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
  isCheckPermissionEdit: boolean;
  optionCurrency: { value: string; label: string }[];
  optionTypeContainer: { value: string; label: string }[];
}

const AirPricingDetailDTO = ({
  form,
  isCheckPermissionEdit,
  optionCurrency,
  optionTypeContainer,
}: Props) => {
  const { translate: translateCommon } = useI18n('common');
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataRequire, setDataRequire] = useState<DataType[]>([]);
  const [optionTypeContainerActive, setOptionTypeContainerActive] = useState<
    { value: string; label: string }[]
  >([]);
  const [idKeyAndContainerType, setIdKeyAndContainerType] = useState<
    { idAirPricingDetailID: Key; idContainerType: string }[]
  >([]);
  const [countLoadData, setCountLoadData] = useState(0);

  // Lấy data từ API và chỉ lấy lần đầu (setDataRequire)
  useEffect(() => {
    // Chỉ lấy data từ API khi lần đầu vào form
    if (form.getFieldValue('airPricingDetailDTOs') && countLoadData === 0) {
      setDataRequire(
        form
          .getFieldValue('airPricingDetailDTOs')
          .map((item: AirPricingDetailDTOsFormValue) => {
            return {
              key: item.airPricingDetailID || '',
              containerTypeCode: item.containerTypeCode || '',
              containerTypeID: item.containerTypeID || '',
              containerTypeName: item.containerTypeName || '',
              currencyID: item.currencyID || '',
              currencyName: item.currencyName || '',
              price: item.price || '',
            };
          })
      );
      setCountLoadData(1);
    }
  }, [form.getFieldValue('airPricingDetailDTOs')]);

  // setOptionTypeContainerActive, setIdKeyAndContainerType
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
          idAirPricingDetailID: item.key,
          idContainerType: item.containerTypeID,
        };
      })
    );
  }, [optionCurrency, dataRequire, optionTypeContainer, dataSource]);

  // setFieldValue airPricingDetailDTOs
  useEffect(() => {
    if (countLoadData === 1 && dataSource.length !== 0) {
      form.setFieldValue(
        'airPricingDetailDTOs',
        dataSource.map((item) => {
          return {
            airPricingDetailID: item.key,
            containerTypeID: item.containerTypeID,
            currencyID: item.currencyID,
            price: item.price,
          };
        })
      );
      setCountLoadData(2);
    }
  }, [dataSource, countLoadData]);

  //setDataSource
  useEffect(() => {
    setDataSource(dataRequire.filter((itemA) => itemA.currencyID !== ''));
  }, [dataRequire]);

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
    form.setFieldValue(
      'airPricingDetailDTOs',
      newData.map((item) => {
        return {
          airPricingDetailID: item.key,
          containerTypeID: item.containerTypeID,
          currencyID: item.currencyID,
          price: item.price,
        };
      })
    );
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Type container',
      dataIndex: 'containerTypeID',
      width: '30%',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return optionTypeContainer.find((item) => item.value === value)?.label;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(value);
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currencyID',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return optionCurrency.find((item) => item.value === value)?.label;
      },
    },
    {
      dataIndex: 'key',
      width: 10,
      render: (value) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(value)}
            disabled={isCheckPermissionEdit}
          >
            <Button
              icon={<DeleteOutlined />}
              style={{
                color: COLORS.ERROR,
                borderColor: COLORS.ERROR,
              }}
              disabled={isCheckPermissionEdit}
            />
          </Popconfirm>
        ) : null,
    },
  ];

  const [count, setCount] = useState(0);
  const handleAdd = () => {
    const newData: DataType = {
      key:
        idKeyAndContainerType.find(
          (item) => item.idContainerType === optionTypeContainerActive[0]?.value
        )?.idAirPricingDetailID || count,
      containerTypeCode: '',
      containerTypeID: optionTypeContainerActive[0]?.value || '',
      containerTypeName: optionTypeContainerActive[0].label || '',
      currencyID: optionCurrency[0].value || '',
      currencyName: optionCurrency[0].label || '',
      price: '1000000',
    };
    const newDataSource = [newData, ...dataSource];
    setDataSource(newDataSource);
    if (optionTypeContainerActive.length > 0) {
      setOptionTypeContainerActive(optionTypeContainerActive.slice(1));
    }
    setCount(count + 1);
    form.setFieldValue(
      'airPricingDetailDTOs',
      newDataSource.map((item) => {
        return {
          airPricingDetailID: item.key,
          containerTypeID: item.containerTypeID,
          currencyID: item.currencyID,
          price: item.price,
        };
      })
    );
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

    form.setFieldValue(
      'airPricingDetailDTOs',
      dataSource.map((item) => {
        return {
          airPricingDetailID: item.key,
          containerTypeID: item.containerTypeID,
          currencyID: item.currencyID,
          price: item.price,
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
        optionTypeContainerActive: optionTypeContainerActive,
        optionTypeContainer: optionTypeContainer,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        style={{
          display: optionTypeContainerActive.length === 0 ? 'none' : '',
          backgroundColor: COLORS.BRIGHT,
          color: COLORS.GREEN,
          borderColor: COLORS.GREEN,
          fontWeight: '500',
          float: 'right',
          marginBottom: 16,
        }}
        disabled={isCheckPermissionEdit}
        onClick={handleAdd}
      >
        {translateCommon('button_add')}
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

export default AirPricingDetailDTO;
