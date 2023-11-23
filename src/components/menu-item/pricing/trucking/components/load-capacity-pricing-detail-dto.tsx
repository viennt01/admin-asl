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
import {
  IFormValues,
  ITruckingPricingDetailLoadCapacityDTOsFormValue,
} from '../interface';
import type { BaseSelectRef } from 'rc-select';
import COLORS from '@/constant/color';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useI18n from '@/i18n/useI18N';
import { formatNumber } from '@/utils/format';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  loadCapacityName: string;
  loadCapacityID: string;
  loadCapacityCode: string;
  currencyID: string;
  currencyName: string;
  price: string;
  vat: string;
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
  inputType: 'number' | 'selectCurrency' | 'selectLoadCapacityType';
  optionCurrency: { value: string; label: string }[];
  optionTypeLoadCapacityActive: { value: string; label: string }[];
  optionTypeLoadCapacity: { value: string; label: string }[];
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
  optionTypeLoadCapacityActive,
  optionTypeLoadCapacity,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef() as MutableRefObject<BaseSelectRef>;
  const form = useContext(EditableContext)!;
  const [optionTypeLoadCapacitySelected, setOptionTypeLoadCapacitySelect] =
    useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (optionTypeLoadCapacity) {
      const itemActive = optionTypeLoadCapacity.find(
        (item) => item.value === record.loadCapacityID
      );
      setOptionTypeLoadCapacitySelect(
        itemActive
          ? [itemActive, ...optionTypeLoadCapacityActive]
          : optionTypeLoadCapacityActive
      );
    }
  }, [
    optionTypeLoadCapacity,
    optionTypeLoadCapacityActive,
    record?.loadCapacityID,
  ]);

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
        formatter={(value) => formatNumber(Number(value) || 0)}
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
        options={optionTypeLoadCapacitySelected}
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
  loadCapacityID: string;
  loadCapacityCode: string;
  loadCapacityName: string;
  currencyID: string;
  currencyName: string;
  price: string;
  vat: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  form: FormInstance<IFormValues>;
  isCheckPermissionEdit: boolean;
  optionCurrency: { value: string; label: string }[];
  optionTypeLoadCapacity: { value: string; label: string }[];
}

const TruckingPricingLoadCapacity = ({
  form,
  isCheckPermissionEdit,
  optionCurrency,
  optionTypeLoadCapacity,
}: Props) => {
  const { translate: translateCommon } = useI18n('common');
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataRequire, setDataRequire] = useState<DataType[]>([]);
  const [optionTypeLoadCapacityActive, setOptionTypeLoadCapacityActive] =
    useState<{ value: string; label: string }[]>([]);
  const [idKeyAndLoadCapacityType, setIdKeyAndLoadCapacityType] = useState<
    { idTruckingPricingDetailID: Key; idLoadCapacityType: string }[]
  >([]);
  const [countLoadData, setCountLoadData] = useState(0);

  const valueCurrencyID = Form.useWatch('currencyID', form);

  // Lấy data từ API và chỉ lấy lần đầu (setDataRequire)
  useEffect(() => {
    // Chỉ lấy data từ API khi lần đầu vào form
    if (
      form.getFieldValue('truckingPricingDetailByLoadCapacityDTOs') &&
      countLoadData === 0
    ) {
      setDataRequire(
        form
          .getFieldValue('truckingPricingDetailByLoadCapacityDTOs')
          .map((item: ITruckingPricingDetailLoadCapacityDTOsFormValue) => {
            return {
              key: item.truckingPricingDetailID || '',
              loadCapacityCode: item.loadCapacityCode || '',
              loadCapacityID: item.loadCapacityID || '',
              loadCapacityName: item.loadCapacityName || '',
              currencyID: item.currencyID || '',
              currencyName: item.currencyName || '',
              price: item.price || '',
              vat: item.vat || '',
            };
          })
      );
      setCountLoadData(1);
    }
  }, [form.getFieldValue('truckingPricingDetailByLoadCapacityDTOs')]);

  useEffect(() => {
    if (valueCurrencyID) {
      setDataSource(
        dataSource.map((item) => ({ ...item, currencyID: valueCurrencyID }))
      );
      form.setFieldValue(
        'truckingPricingDetailByLoadCapacityDTOs',
        dataSource.map((item) => ({ ...item, currencyID: valueCurrencyID }))
      );
    }
  }, [valueCurrencyID]);

  // setOptionTypeLoadCapacityActive, setIdKeyAndLoadCapacityType
  useEffect(() => {
    setOptionTypeLoadCapacityActive(
      optionTypeLoadCapacity.filter(
        (itemB) =>
          !dataSource.some(
            (itemA) =>
              itemA.loadCapacityID === itemB.value && itemA.price !== ''
          )
      )
    );
    setIdKeyAndLoadCapacityType(
      dataRequire.map((item) => {
        return {
          idTruckingPricingDetailID: item.key,
          idLoadCapacityType: item.loadCapacityID,
        };
      })
    );
  }, [optionCurrency, dataRequire, optionTypeLoadCapacity, dataSource]);

  // setFieldValue truckingPricingDetailByLoadCapacityDTOs
  useEffect(() => {
    if (countLoadData === 1 && dataSource.length !== 0) {
      form.setFieldValue(
        'truckingPricingDetailByLoadCapacityDTOs',
        dataSource.map((item) => {
          return {
            truckingPricingDetailID: item.key,
            loadCapacityID: item.loadCapacityID,
            currencyID: item.currencyID,
            price: item.price,
            vat: item.vat,
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
    setOptionTypeLoadCapacityActive([
      {
        value: itemDelete[0].loadCapacityID,
        label: itemDelete[0].loadCapacityCode,
      },
      ...optionTypeLoadCapacityActive,
    ]);
    setDataSource(newData);
    form.setFieldValue(
      'truckingPricingDetailByLoadCapacityDTOs',
      newData.map((item) => {
        return {
          truckingPricingDetailID: item.key,
          loadCapacityID: item.loadCapacityID,
          currencyID: item.currencyID,
          price: item.price,
          vat: item.vat,
        };
      })
    );
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Type FCL',
      dataIndex: 'loadCapacityID',
      width: '30%',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return optionTypeLoadCapacity.find((item) => item.value === value)
          ?.label;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || 0);
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
      title: 'VAT',
      dataIndex: 'vat',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || 0);
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
        idKeyAndLoadCapacityType.find(
          (item) =>
            item.idLoadCapacityType === optionTypeLoadCapacityActive[0]?.value
        )?.idTruckingPricingDetailID || count,
      loadCapacityCode: '',
      loadCapacityID: optionTypeLoadCapacityActive[0]?.value || '',
      loadCapacityName: optionTypeLoadCapacityActive[0].label || '',
      currencyID: valueCurrencyID || optionCurrency[0].value || '',
      currencyName: optionCurrency[0].label || '',
      price: '1000000',
      vat: '0',
    };
    const newDataSource = [newData, ...dataSource];
    setDataSource(newDataSource);
    if (optionTypeLoadCapacityActive.length > 0) {
      setOptionTypeLoadCapacityActive(optionTypeLoadCapacityActive.slice(1));
    }
    setCount(count + 1);
    form.setFieldValue(
      'truckingPricingDetailByLoadCapacityDTOs',
      newDataSource.map((item) => {
        return {
          truckingPricingDetailID: item.key,
          loadCapacityID: item.loadCapacityID,
          currencyID: item.currencyID,
          price: item.price,
          vat: item.vat,
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
    setOptionTypeLoadCapacityActive(
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
      'truckingPricingDetailByLoadCapacityDTOs',
      dataSource.map((item) => {
        return {
          truckingPricingDetailID: item.key, //1
          loadCapacityID: item.loadCapacityID,
          currencyID: item.currencyID,
          price: item.price,
          vat: item.vat,
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
          col.dataIndex === 'price' || col.dataIndex === 'vat'
            ? 'number'
            : col.dataIndex === 'currencyID'
            ? 'selectCurrency'
            : 'selectLoadCapacityType',
        optionCurrency: optionCurrency,
        optionTypeLoadCapacityActive: optionTypeLoadCapacityActive,
        optionTypeLoadCapacity: optionTypeLoadCapacity,
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
          display: optionTypeLoadCapacityActive.length === 0 ? 'none' : '',
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

export default TruckingPricingLoadCapacity;
