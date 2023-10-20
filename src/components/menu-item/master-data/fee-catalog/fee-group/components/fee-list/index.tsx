import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { FeeTable, RequestUpdateFeeOfFeeGroup } from '../../interface';
import COLORS from '@/constant/color';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useI18n from '@/i18n/useI18N';
import { EditableCell, EditableRow } from './edit-item';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFeeWithFeeGroup, updateFeeWithFeeGroup } from '../../fetcher';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Props {
  isCheckPermissionEdit: boolean;
  optionFee: { value: string; label: string }[];
  idFeeGroup: string;
  dataSource: FeeTable[];
  setDataSource: Dispatch<SetStateAction<FeeTable[]>>;
  edit?: boolean;
}

const FeeList = ({
  isCheckPermissionEdit,
  optionFee,
  idFeeGroup,
  dataSource,
  setDataSource,
  edit,
}: Props) => {
  const { translate: translateCommon } = useI18n('common');
  const [optionFeeActive, setOptionFeeActive] = useState<
    { value: string; label: string }[]
  >([]);
  const queryClient = useQueryClient();

  useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP],
    queryFn: () => getFeeWithFeeGroup({ id: [idFeeGroup] }),
    enabled: idFeeGroup !== undefined,
    onSuccess(data) {
      if (data.status) {
        if (data.data) {
          setDataSource(data.data);
        }
      }
    },
  });

  useEffect(() => {
    setOptionFeeActive(
      optionFee.filter(
        (itemB) =>
          !dataSource.some(
            (itemA) => itemA.feeID === itemB.value && itemA.feeID !== ''
          )
      )
    );
  }, [optionFee, dataSource]);

  const updateFeeMutation = useMutation({
    mutationFn: (body: RequestUpdateFeeOfFeeGroup) => {
      return updateFeeWithFeeGroup(body);
    },
  });

  const handleUpdateFee = () => {
    const _requestData = {
      feeGroupID: idFeeGroup,
      feeList: dataSource.map((fee) => {
        return {
          feeID: fee.feeID,
          priceFeeGroup: fee.priceFeeGroup,
          vatFeeGroup: fee.vatFeeGroup,
        };
      }),
    };
    updateFeeMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message),
            queryClient.invalidateQueries({
              queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP],
            }))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  const [count, setCount] = useState(0);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    if (edit) {
      handleUpdateFee();
    }
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Fee',
      dataIndex: 'feeID',
      width: '30%',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return optionFee.find((item) => item.value === value)?.label;
      },
    },
    {
      title: 'Price',
      dataIndex: 'priceFeeGroup',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    {
      title: 'Vat',
      dataIndex: 'vatFeeGroup',
      editable: !isCheckPermissionEdit,
      render: (value) => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    const newData: FeeTable = {
      key: count,
      feeID: optionFee[0]?.value || '',
      priceFeeGroup: '1000000',
      vatFeeGroup: '1000000',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    if (edit) {
      handleUpdateFee();
    }
  };

  const handleSave = (row: FeeTable) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    if (edit) {
      handleUpdateFee();
    }
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
      onCell: (record: FeeTable) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.dataIndex === 'feeID' ? 'select' : 'input',
        optionFeeActive: optionFeeActive,
        optionFee: optionFee,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        style={{
          display: optionFeeActive.length === 0 ? 'none' : '',
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

export default FeeList;
