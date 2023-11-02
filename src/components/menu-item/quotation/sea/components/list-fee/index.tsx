import { Form, FormInstance, Tabs } from 'antd';

import { useEffect, useState } from 'react';
import AddFeeModal from './modal-add-fee';
import { IFormValues, ISeaQuotationFeeFormValue } from '../../interface';
import TableFeeGroup from './table-fee-group';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Props {
  form: FormInstance<IFormValues>;
}
const ListFee = ({ form }: Props) => {
  const [dataFee, setDataFee] = useState<ISeaQuotationFeeFormValue[]>([]);
  const [idActive, setIdActive] = useState<string[]>([]);
  const listIdFeeGroup = Form.useWatch('seaQuotaionFeeGroupDTOs', form);
  const [activeKey, setActiveKey] = useState('1');

  const defaultPanes = dataFee?.map((value) => {
    return {
      label: `${value.feeGroupName}`,
      children: <TableFeeGroup dataTable={value.seaQuotationFeeDTOs} />,
      key: `${value.feeGroupID}`,
    };
  });

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
  console.log(idActive);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    // const newActiveKey = `newTab${newTabIndex.current++}`;
    // setItems([
    //   ...items,
    //   { label: 'New Tab', children: <TableFeeGroup />, key: newActiveKey },
    // ]);
    // setActiveKey(newActiveKey);
    console.log(1);
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
      <AddFeeModal add={add} idActive={idActive} />
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </>
  );
};

export default ListFee;
