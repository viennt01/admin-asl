import React, {
  Ref,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
  Key,
} from 'react';
import {
  Button,
  Form,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import { ICustomQuotationFCLDetailDTOs, IFormValues } from '../interface';
import type { BaseSelectRef } from 'rc-select';
import COLORS from '@/constant/color';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useI18n from '@/i18n/useI18N';
import { formatNumber } from '@/utils/format';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  customQuotationFCLDetailID?: string;
  internationalCode?: string;
  unitID: string;
  basePriceRedLane: string;
  basePriceGreenLane: string;
  basePriceYellowLane: string;
  priceRedLane: string;
  priceGreenLane: string;
  priceYellowLane: string;
  vatCustomQuotation: string;
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
  inputType: 'number' | 'select';
  optionUnitActive: { value: string; label: string }[];
  optionUnit: { value: string; label: string }[];
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  editable,
  inputType,
  children,
  optionUnitActive,
  optionUnit,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef() as MutableRefObject<BaseSelectRef>;
  const form = useContext(EditableContext)!;
  const [optionUnitSelected, setOptionUnitSelect] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (optionUnit) {
      const itemActive = optionUnit.find(
        (item) => item.value === record.unitID
      );
      setOptionUnitSelect(
        itemActive ? [itemActive, ...optionUnitActive] : optionUnitActive
      );
    }
  }, [optionUnit, optionUnitActive, record?.unitID]);

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
    ) : (
      <Select
        ref={inputRef}
        showSearch
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        optionFilterProp="children"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
        style={{ width: '100%' }}
        onBlur={save}
        options={optionUnitSelected}
      />
    );
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
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
  customQuotationFCLDetailID?: string;
  internationalCode?: string;
  unitID: string;
  basePriceRedLane: string;
  basePriceGreenLane: string;
  basePriceYellowLane: string;
  priceRedLane: string;
  priceGreenLane: string;
  priceYellowLane: string;
  vatCustomQuotation: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  form: FormInstance<IFormValues>;
  isCheckPermissionEdit: boolean;
  optionUnit: { value: string; label: string }[];
}
const { Text } = Typography;

const FCL = ({ form, isCheckPermissionEdit, optionUnit }: Props) => {
  const { translate: translateCommon } = useI18n('common');
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataRequire, setDataRequire] = useState<DataType[]>([]);
  const [optionUnitActive, setOptionUnitActive] = useState<
    { value: string; label: string }[]
  >([]);
  const [idKeyAndUnit, setIdKeyAndUnit] = useState<
    { idCustomsFCLPricingDetailID: Key; idUnit: string }[]
  >([]);
  const [countLoadData, setCountLoadData] = useState(0);

  // Lấy data từ API và chỉ lấy lần đầu (setDataRequire)
  useEffect(() => {
    // Chỉ lấy data từ API khi lần đầu vào form
    if (
      form.getFieldValue('customQuotationFCLDetailDTOs') &&
      countLoadData === 0
    ) {
      setDataRequire(
        form
          .getFieldValue('customQuotationFCLDetailDTOs')
          .map((item: ICustomQuotationFCLDetailDTOs) => {
            return {
              key: item.customQuotationFCLDetailID || '',
              unitID: item.unitID || '',
              basePriceRedLane: item.basePriceRedLane || '',
              basePriceGreenLane: item.basePriceGreenLane || '',
              basePriceYellowLane: item.basePriceYellowLane || '',
              priceRedLane: item.priceRedLane || '',
              priceGreenLane: item.priceGreenLane || '',
              priceYellowLane: item.priceYellowLane || '',
              vatCustomQuotation: item.vatCustomQuotation || '',
            };
          })
      );
      setCountLoadData(1);
    }
  }, [form.getFieldValue('customQuotationFCLDetailDTOs')]);

  useEffect(() => {
    setOptionUnitActive(
      optionUnit.filter(
        (itemB) => !dataSource.some((itemA) => itemA.unitID === itemB.value)
      )
    );
    setIdKeyAndUnit(
      dataRequire.map((item) => {
        return {
          idCustomsFCLPricingDetailID: item.key,
          idUnit: item.unitID,
        };
      })
    );
  }, [dataRequire, optionUnit, dataSource]);

  // setFieldValue customQuotationFCLDetailDTOs
  useEffect(() => {
    if (countLoadData === 1 && dataSource.length !== 0) {
      form.setFieldValue(
        'customQuotationFCLDetailDTOs',
        dataSource.map((item) => {
          return {
            customQuotationFCLDetailID: item.key,
            unitID: item.unitID,
            basePriceRedLane: item.basePriceRedLane,
            basePriceGreenLane: item.basePriceGreenLane,
            basePriceYellowLane: item.basePriceYellowLane,
            priceRedLane: item.priceRedLane,
            priceGreenLane: item.priceGreenLane,
            priceYellowLane: item.priceYellowLane,
            vatCustomQuotation: item.vatCustomQuotation,
          };
        })
      );
      setCountLoadData(2);
    }
  }, [dataSource, countLoadData]);

  //setDataSource
  useEffect(() => {
    setDataSource(dataRequire.map((item) => ({ ...item })));
  }, [dataRequire]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    const itemDelete = dataSource.filter((item) => item.key == key);
    setOptionUnitActive([
      {
        value: itemDelete[0].unitID,
        label: itemDelete[0].internationalCode || '',
      },
      ...optionUnitActive,
    ]);
    setDataSource(newData);
    form.setFieldValue(
      'customQuotationFCLDetailDTOs',
      newData.map((item) => {
        return {
          customQuotationFCLDetailID: item.key,
          unitID: item.unitID,
          internationalCode: item.internationalCode,
          basePriceRedLane: item.basePriceRedLane,
          basePriceGreenLane: item.basePriceGreenLane,
          basePriceYellowLane: item.basePriceYellowLane,
          priceRedLane: item.priceRedLane,
          priceGreenLane: item.priceGreenLane,
          priceYellowLane: item.priceYellowLane,
          vatCustomQuotation: item.vatCustomQuotation,
        };
      })
    );
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Unit',
      dataIndex: 'unitID',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return optionUnit.find((item) => item.value === value)?.label;
      },
    },
    {
      title: <Text style={{ color: 'green' }}>Base Price Green</Text>,
      dataIndex: 'basePriceGreenLane',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Base Price Yellow</Text>,
      dataIndex: 'basePriceYellowLane',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Base Price Red</Text>,
      dataIndex: 'basePriceRedLane',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: (
        <Text color={'green'} style={{ color: 'green' }}>
          Price Green
        </Text>
      ),
      dataIndex: 'priceGreenLane',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Price Yellow</Text>,
      dataIndex: 'priceYellowLane',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Price Red</Text>,
      dataIndex: 'priceRedLane',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || '0');
      },
    },
    {
      title: <Text>VAT</Text>,
      dataIndex: 'vatCustomQuotation',
      align: 'center',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return formatNumber(Number(value) || '0') === '0'
          ? '-'
          : formatNumber(Number(value) || '0');
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
        idKeyAndUnit.find((item) => item.idUnit === optionUnitActive[0]?.value)
          ?.idCustomsFCLPricingDetailID || count,
      unitID: optionUnitActive[0]?.value || '',
      internationalCode: optionUnitActive[0]?.label || '',
      basePriceRedLane: '1000000',
      basePriceGreenLane: '1000000',
      basePriceYellowLane: '1000000',
      priceRedLane: '1000000',
      priceGreenLane: '1000000',
      priceYellowLane: '1000000',
      vatCustomQuotation: '',
    };
    const newDataSource = [newData, ...dataSource];
    setDataSource(newDataSource);
    form.setFieldValue(
      'customQuotationFCLDetailDTOs',
      newDataSource.map((item) => {
        return {
          customQuotationFCLDetailID: item.key,
          unitID: item.unitID,
          internationalCode: item.internationalCode,
          basePriceRedLane: item.basePriceRedLane,
          basePriceGreenLane: item.basePriceGreenLane,
          basePriceYellowLane: item.basePriceYellowLane,
          priceRedLane: item.priceRedLane,
          priceGreenLane: item.priceGreenLane,
          priceYellowLane: item.priceYellowLane,
          vatCustomQuotation: item.vatCustomQuotation,
        };
      })
    );
    if (optionUnitActive.length > 0) {
      setOptionUnitActive(optionUnitActive.slice(1));
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
    setOptionUnitActive(
      optionUnit.filter(
        (itemB) => !newData.some((itemA) => itemA.unitID === itemB.value)
      )
    );
    setDataSource(newData);

    form.setFieldValue(
      'customQuotationFCLDetailDTOs',
      newData.map((item) => {
        return {
          customQuotationFCLDetailID: item.key,
          unitID: item.unitID,
          internationalCode: item.internationalCode,
          basePriceRedLane: item.basePriceRedLane,
          basePriceGreenLane: item.basePriceGreenLane,
          basePriceYellowLane: item.basePriceYellowLane,
          priceRedLane: item.priceRedLane,
          priceGreenLane: item.priceGreenLane,
          priceYellowLane: item.priceYellowLane,
          vatCustomQuotation: item.vatCustomQuotation,
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
        inputType: col.dataIndex === 'unitID' ? 'select' : 'number',
        optionUnitActive: optionUnitActive,
        optionUnit: optionUnit,
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
          display: optionUnitActive.length === 0 ? 'none' : '',
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

export default FCL;
