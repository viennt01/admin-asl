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
import { IFormValues, IAirQuotationDetailDTOsFormValue } from '../interface';
import type { BaseSelectRef } from 'rc-select';
import COLORS from '@/constant/color';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useI18n from '@/i18n/useI18N';
import { formatNumber } from '@/utils/format';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  containerTypeCode: string;
  loadCapacityID: string;
  loadCapacityName: string;
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
        (item) => item.value === record.loadCapacityID
      );
      setOptionTypeContainerSelect(
        itemActive
          ? [itemActive, ...optionTypeContainerActive]
          : optionTypeContainerActive
      );
    }
  }, [optionTypeContainer, optionTypeContainerActive, record?.loadCapacityID]);

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
  loadCapacityID: string;
  loadCapacityName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  form: FormInstance<IFormValues>;
  create: boolean | undefined;
  isCheckPermissionEdit: boolean;
  optionCurrency: { value: string; label: string }[];
  optionTypeLoadCapacity: { value: string; label: string }[];
}

const AirQuotationDetailDTO = ({
  form,
  create,
  isCheckPermissionEdit,
  optionCurrency,
  optionTypeLoadCapacity,
}: Props) => {
  const { translate: translateCommon } = useI18n('common');
  const [optionTypeContainerActive, setOptionTypeContainerActive] = useState<
    { value: string; label: string }[]
  >([]);
  const [idKeyAndContainerType, setIdKeyAndContainerType] = useState<
    { idAirPricingDetailID: Key; idContainerType: string }[]
  >([]);
  const [count, setCount] = useState(0);
  const [countLoadData, setCountLoadData] = useState(0);
  const valueCurrencyID =
    Form.useWatch('currencyID', form) || optionCurrency[0]?.value;
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataRequire, setDataRequire] = useState<DataType[]>([]);

  // Lấy data từ API và chỉ lấy lần đầu (setDataRequire)
  useEffect(() => {
    if (
      optionTypeLoadCapacity &&
      form.getFieldValue('airQuotationDetailDTOs') &&
      countLoadData === 0
    ) {
      if (create) {
        setDataRequire(
          optionTypeLoadCapacity.map((item) => {
            return {
              key:
                idKeyAndContainerType.find(
                  (item) =>
                    item.idContainerType === optionTypeContainerActive[0]?.value
                )?.idAirPricingDetailID || count,
              containerTypeCode: '',
              loadCapacityID: item.value || '',
              loadCapacityName: optionTypeContainerActive[0]?.label || '',
              currencyID: valueCurrencyID || optionCurrency[0]?.value || '',
              currencyName: optionCurrency[0].label || '',
              price: '1000000',
            };
          })
        );
        setCount(count + 1);
      } else {
        setDataRequire(
          form
            .getFieldValue('airQuotationDetailDTOs')
            .map((item: IAirQuotationDetailDTOsFormValue) => {
              return {
                key: item.airPricingDetailID || '',
                loadCapacityName: item.loadCapacityName || '',
                loadCapacityID: item.loadCapacityID || '',
                price: item.price || '',
              };
            })
        );
      }
      setCountLoadData(1);
    }
  }, [form.getFieldValue('airQuotationDetailDTOs'), optionTypeLoadCapacity]);

  useEffect(() => {
    if (valueCurrencyID) {
      setDataSource(
        dataSource.map((item) => ({ ...item, currencyID: valueCurrencyID }))
      );
      form.setFieldValue(
        'airQuotationDetailDTOs',
        dataSource.map((item) => ({ ...item, currencyID: valueCurrencyID }))
      );
    }
  }, [valueCurrencyID]);

  // setOptionTypeContainerActive, setIdKeyAndContainerType
  useEffect(() => {
    setOptionTypeContainerActive(
      optionTypeLoadCapacity?.filter(
        (itemB) =>
          !dataSource.some(
            (itemA) =>
              itemA.loadCapacityID === itemB.value && itemA.price !== ''
          )
      )
    );
    setIdKeyAndContainerType(
      dataRequire.map((item) => {
        return {
          idAirPricingDetailID: item.key,
          idContainerType: item.loadCapacityID,
        };
      })
    );
  }, [optionCurrency, dataRequire, optionTypeLoadCapacity, dataSource]);

  // setFieldValue airPricingDetailDTOs
  useEffect(() => {
    if (countLoadData === 1 && dataSource.length !== 0) {
      form.setFieldValue(
        'airQuotationDetailDTOs',
        dataSource.map((item) => {
          return {
            airPricingDetailID: item.key,
            loadCapacityID: item.loadCapacityID,
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
    setDataSource(
      dataRequire
        .filter((itemA) => itemA.price !== '')
        .map((item) => ({ ...item, currencyID: valueCurrencyID }))
    );
  }, [dataRequire]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    const itemDelete = dataSource.filter((item) => item.key == key);
    setOptionTypeContainerActive([
      {
        value: itemDelete[0].loadCapacityID,
        label: itemDelete[0].loadCapacityName,
      },
      ...optionTypeContainerActive,
    ]);
    setDataSource(newData);
    form.setFieldValue(
      'airQuotationDetailDTOs',
      newData.map((item) => {
        return {
          airPricingDetailID: item.key,
          loadCapacityID: item.loadCapacityID,
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
      title: 'Type Load Capacity',
      dataIndex: 'loadCapacityID',
      width: '30%',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return optionTypeLoadCapacity?.find((item) => item.value === value)
          ?.label;
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

  const handleAdd = () => {
    const newData: DataType = {
      key:
        idKeyAndContainerType.find(
          (item) => item.idContainerType === optionTypeContainerActive[0]?.value
        )?.idAirPricingDetailID || count,
      containerTypeCode: '',
      loadCapacityID: optionTypeContainerActive[0]?.value || '',
      loadCapacityName: optionTypeContainerActive[0].label || '',
      currencyID: valueCurrencyID || optionCurrency[0].value || '',
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
      'airQuotationDetailDTOs',
      newDataSource.map((item) => {
        return {
          airPricingDetailID: item.key,
          loadCapacityID: item.loadCapacityID,
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
      optionTypeLoadCapacity.filter(
        (itemB) =>
          !newData.some(
            (itemA) =>
              itemA.loadCapacityID === itemB.value && itemA.currencyID !== ''
          )
      )
    );
    setDataSource(newData);

    form.setFieldValue(
      'airQuotationDetailDTOs',
      dataSource.map((item) => {
        return {
          airPricingDetailID: item.key,
          loadCapacityID: item.loadCapacityID,
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
        optionTypeContainer: optionTypeLoadCapacity,
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
          display: optionTypeContainerActive?.length === 0 ? 'none' : '',
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

export default AirQuotationDetailDTO;
