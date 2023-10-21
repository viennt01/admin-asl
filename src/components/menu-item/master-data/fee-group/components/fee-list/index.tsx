import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import {
  FeeTable,
  RequestDeleteFeeOfFeeGroup,
  RequestUpdateFeeOfFeeGroup,
} from '../../interface';
import COLORS from '@/constant/color';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useI18n from '@/i18n/useI18N';
import { EditableCell, EditableRow } from './edit-item';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFeeWithFeeGroup,
  getFeeWithFeeGroup,
  updateFeeWithFeeGroup,
} from '../../fetcher';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import { errorToast } from '@/hook/toast';
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
  create?: boolean;
}

const FeeList = ({
  isCheckPermissionEdit,
  optionFee,
  idFeeGroup,
  dataSource,
  setDataSource,
  create,
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
      setDataSource([]);
      if (data.status) {
        if (data.data) {
          setDataSource(
            data.data.map((fee) => ({
              key: fee.feeID,
              feeID: fee.feeID,
              priceFeeGroup: fee.priceFeeGroup,
              vatFeeGroup: fee.vatFeeGroup,
            }))
          );
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

  const deleteFeeMutation = useMutation({
    mutationFn: (body: RequestDeleteFeeOfFeeGroup) => {
      return deleteFeeWithFeeGroup(body);
    },
  });

  const handleUpdateFee = (newDataSource: FeeTable[]) => {
    const _requestData = {
      feeGroupID: idFeeGroup,
      feeList: newDataSource.map((fee) => {
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
          ? queryClient.invalidateQueries({
              queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP],
            })
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  const handleDeleteFee = (key: React.Key) => {
    const _requestData = {
      feeGroupID: idFeeGroup,
      ids: [key],
    };
    deleteFeeMutation.mutate(_requestData, {
      onSuccess: (data) => {
        data.status
          ? queryClient.invalidateQueries({
              queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP],
            })
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
    const itemDelete = dataSource.filter((item) => item.key == key);
    setOptionFeeActive([
      {
        value: itemDelete[0].feeID,
        label: itemDelete[0].feeName || '',
      },
      ...optionFeeActive,
    ]);

    if (create) {
      setDataSource(newData);
    } else {
      handleDeleteFee(key);
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
      feeID: optionFeeActive[0].value,
      priceFeeGroup: '1000000',
      vatFeeGroup: '1000000',
    };
    const newDataSource = [...dataSource, newData];
    setDataSource(newDataSource);
    setCount(count + 1);

    if (!create) {
      handleUpdateFee(newDataSource);
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

    if (!create) {
      handleUpdateFee(newData);
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
