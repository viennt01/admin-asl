import { Button, Form, FormInstance, Modal, Row, Tabs } from 'antd';

import { useEffect, useState } from 'react';
import AddFeeModal from './modal-add-fee';
import { IFormValues, ISeaQuotationFeeFormValue } from '../../interface';
import TableFeeGroup from './table-fee-group';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import { useQuery } from '@tanstack/react-query';
import { getAllFeeGroup } from '@/components/menu-item/quotation/fee-group/fetcher';
import {
  IDataFeeGroup,
  TYPE_FEE_GROUP,
} from '@/components/menu-item/quotation/fee-group/interface';
import { errorToast } from '@/hook/toast';
import router from 'next/router';
import { API_MESSAGE } from '@/constant/message';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Props {
  form: FormInstance<IFormValues>;
  create?: boolean;
}
const ListFee = ({ form, create }: Props) => {
  const [formModalAdd] = Form.useForm();
  const onOke = () => formModalAdd.submit();
  const [dataFee, setDataFee] = useState<ISeaQuotationFeeFormValue[]>([]);
  const [idActive, setIdActive] = useState<string[]>([]);
  const listIdFeeGroup = Form.useWatch('customQuotationFeeGroupDTOs', form);
  const [activeKey, setActiveKey] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feeGroupData, setFeeGroupData] = useState<IDataFeeGroup[]>([]);

  useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL],
    queryFn: () => getAllFeeGroup({ type: TYPE_FEE_GROUP.TOTAL }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
        errorToast(API_MESSAGE.ERROR);
      } else {
        setFeeGroupData(data.data);
      }
    },
    onError: () => {
      router.back();
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const defaultPanes =
    dataFee?.map((value) => {
      return {
        label: `${value.feeGroupName}`,
        children: <TableFeeGroup dataTable={value.feeGroupID} />,
        key: `${value.feeGroupID}`,
        closable: create ? true : false,
      };
    }) || [];

  const [items, setItems] = useState(defaultPanes);

  useEffect(() => {
    setDataFee(listIdFeeGroup);
  }, [listIdFeeGroup]);
  useEffect(() => {
    setItems(defaultPanes);
    if (dataFee) {
      setIdActive(dataFee.map((value) => value.feeGroupID));
    }
    if (defaultPanes && defaultPanes.length > 0) {
      setActiveKey(defaultPanes[0].key);
    }
  }, [dataFee]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (Array.isArray(items)) {
      const newData =
        feeGroupData
          .map((item) => {
            return {
              value: item.feeGroupID,
              label: item.feeGroupName,
            };
          })
          .filter((itemB) =>
            [formModalAdd?.getFieldValue('feeGroupID')]?.includes(itemB.value)
          ) || [];

      if (newData[0]) {
        setItems([
          ...items,
          {
            label: newData[0]?.label || 'New Group',
            children: <TableFeeGroup dataTable={newData[0]?.value || '1'} />,
            key: newData[0]?.value || `${newData.length + 1}`,
            closable: create ? true : false,
          },
        ]);
        setActiveKey(newData[0].value);
      }
      setIsModalOpen(false);
      formModalAdd.resetFields();
      form.setFieldValue('customQuotationFeeGroupDTOs', [
        ...listIdFeeGroup,
        {
          feeGroupName: newData[0]?.label || 'New Group',
          feeGroupID: newData[0]?.value,
        },
      ]);
    } else {
      console.error('items is not an array');
    }
  };

  const handleCancel = () => {
    formModalAdd.resetFields();
    setIsModalOpen(false);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
    form.setFieldValue(
      'customQuotationFeeGroupDTOs',
      newPanes.map((pane) => {
        return {
          feeGroupName: pane.label,
          feeGroupID: pane.key,
        };
      })
    );
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <>
      <Tabs
        hideAdd={create ? false : true}
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
      <Modal
        title="Add other charges"
        open={isModalOpen}
        onOk={onOke}
        onCancel={handleCancel}
        width={900}
        footer={[
          <Row key="back">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={onOke}>
              Add
            </Button>
          </Row>,
        ]}
      >
        <Form form={formModalAdd} component={false} onFinish={handleOk}>
          <AddFeeModal
            form={formModalAdd}
            idActive={idActive}
            getFeeGroup={feeGroupData}
          />
        </Form>
      </Modal>
    </>
  );
};

export default ListFee;
