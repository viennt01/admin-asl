import { Form, FormInstance, InputNumber, Select } from 'antd';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  Ref,
} from 'react';
import type { BaseSelectRef } from 'rc-select';
import { FeeTable } from '../../interface';
import { formatNumber } from '@/utils/format';
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

export const EditableRow: React.FC<EditableRowProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index,
  ...props
}) => {
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
  inputType:
    | 'feeID'
    | 'priceFeeGroup'
    | 'vatFeeGroup'
    | 'currencyID'
    | 'unitID';
  optionFee: { value: string; label: string }[];
  optionUnit: { value: string; label: string }[];
  optionCurrency: { value: string; label: string }[];
  children: React.ReactNode;
  dataIndex: keyof FeeTable;
  record: FeeTable;
  handleSave: (record: FeeTable) => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  inputType,
  children,
  optionFee,
  optionUnit,
  optionCurrency,
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
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  const inputNode =
    inputType === 'feeID' ? (
      <Select
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
        style={{ width: '100%' }}
        onBlur={save}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toUpperCase().includes(input.toUpperCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={optionFee}
      />
    ) : inputType === 'currencyID' ? (
      <Select
        showSearch
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
        style={{ width: '100%' }}
        onBlur={save}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toUpperCase().includes(input.toUpperCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={optionCurrency}
      />
    ) : inputType === 'unitID' ? (
      <Select
        showSearch
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
        style={{ width: '100%' }}
        onBlur={save}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toUpperCase().includes(input.toUpperCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={optionUnit}
      />
    ) : (
      <InputNumber
        ref={inputRef as unknown as Ref<HTMLInputElement>}
        onPressEnter={save}
        onBlur={save}
        style={{ width: '100%' }}
        formatter={(value) => formatNumber(value || 0)}
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
