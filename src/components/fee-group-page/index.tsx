import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreateFeeGroup from './create';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/es/table/interface';
import style from './index.module.scss';

const STATUS_COLORS = {
  Active: '#00A651',
  Draft: 'rgb(124 117 117)',
};
const STATUS_LABELS = {
  Active: 'Active',
  Draft: 'Draft',
};

export default function FeeGroupPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateFeeGroup } = useI18n('feeGroup');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    no: number;
    code: string;
    name: string;
    typeFeeGroup: string;
    status: string;
    dateCreated: string;
    creator: string;
    dateInserted: string;
    inserter: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      no: i + 1,
      code: 'FEE1234',
      name: 'Lệ phí đối với hàng hoá quá cảnh',
      typeFeeGroup: 'Phí hải quan',
      status: i % 2 === 1 ? 'Draft' : 'Active',
      dateCreated: '26/04/2023',
      creator: 'ASL',
      dateInserted: '28/04/2023',
      inserter: 'ASL',
    });
  }

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  type DataIndex = keyof DataType;

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ProColumns<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ProColumns<DataType>[] = [
    {
      title: translateFeeGroup('no'),
      width: 80,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('no'),
    },
    {
      title: translateFeeGroup('fee_group_code'),
      width: 200,
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('code'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateFeeGroup('fee_group_name'),
      width: 250,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('name'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateFeeGroup('type_of_fee_group'),
      width: 180,
      dataIndex: 'typeFeeGroup',
      key: 'typeFeeGroup',
      align: 'center',
      ...getColumnSearchProps('typeFeeGroup'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateFeeGroup('status'),
      width: 150,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Tạm ngừng',
          value: 'Draft',
        },
      ],
      // onFilter: (value: string, record) => record.address.startsWith(value),
      filterSearch: true,
      render: (value) => (
        <Tag
          color={STATUS_COLORS[value as keyof typeof STATUS_COLORS]}
          style={{
            margin: 0,
          }}
        >
          {STATUS_LABELS[value as keyof typeof STATUS_LABELS]}
        </Tag>
      ),
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateFeeGroup('date_created')}
        </div>
      ),
      width: 150,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateFeeGroup('creator')}
        </div>
      ),
      width: 200,
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateFeeGroup('date_inserted')}
        </div>
      ),
      width: 150,
      dataIndex: 'dateInserted',
      key: 'dateInserted',
      align: 'center',
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateFeeGroup('inserter')}
        </div>
      ),
      width: 200,
      dataIndex: 'inserter',
      key: 'inserter',
      align: 'center',
    },
    {
      key: 'operation',
      fixed: 'right',
      width: 50,
      align: 'center',
      dataIndex: 'key',
      render: (value) => (
        <Button
          onClick={() => handleEditCustomer(value as string)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditCustomer = (id: string) => {
    router.push(ROUTERS.FEE_GROUP_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <ProTable<DataType>
      className={style.table}
      style={{ marginTop: '8px' }}
      rowKey="key"
      dataSource={data}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selectedRowKeys,
        onChange: handleSelectionChange,
      }}
      pagination={{
        position: ['bottomCenter'],
        showTotal: () => '',
        showSizeChanger: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      headerTitle={translateFeeGroup('title')}
      scroll={{
        x: 'max-content',
      }}
      sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolBarRender={() => [
        <CreateFeeGroup key={'create'} />,
        <Button
          icon={<DeleteOutlined />}
          style={{
            backgroundColor: COLORS.RED,
            color: COLORS.WHITE,
            borderColor: COLORS.RED,
            fontWeight: '500',
          }}
          key={'delete'}
        >
          {translateCommon('button_delete')}
        </Button>,
      ]}
    />
  );
}
