import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreateTypeOfLocation from './create-type-of-location';
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
  DeActive: '#ED1C27',
};

const STATUS_LABELS = {
  Active: 'Active',
  DeActive: 'Tạm ngừng',
};

export default function TypeOfLocationPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateTypeOfLocation } = useI18n('typeOfLocation');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    key: number;
    name: string;
    description: string;
    status: string;
    dateCreated: string;
    dateUpdate: string;
    updater: string;
    creator: string;
  }

  const data: DataType[] = [];

  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      name: i % 2 === 0 ? 'Air Port' : 'Sea Port',
      description: '',
      status: i % 2 === 0 ? 'Active' : 'DeActive',
      dateCreated: '14/06/2023',
      dateUpdate: '14/06/2023',
      updater: 'Admin',
      creator: 'Admin',
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
      title: translateTypeOfLocation('no'),
      width: 80,
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateTypeOfLocation('name'),
      width: 200,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      fixed: 'left',
      ...getColumnSearchProps('name'),
    },

    {
      title: translateTypeOfLocation('description'),
      width: 250,
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...getColumnSearchProps('description'),
    },

    {
      title: translateTypeOfLocation('status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Tạm ngừng',
          value: 'DeActive',
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
          {translateTypeOfLocation('date_created')}
        </div>
      ),
      width: 150,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
      ...getColumnSearchProps('dateCreated'),
    },

    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateTypeOfLocation('date_update')}
        </div>
      ),
      width: 150,
      dataIndex: 'dateUpdate',
      key: 'dateUpdate',
      align: 'center',
      ...getColumnSearchProps('dateUpdate'),
    },

    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateTypeOfLocation('updater')}
        </div>
      ),
      width: 200,
      dataIndex: 'updater',
      key: 'updater',
      align: 'center',
      ...getColumnSearchProps('updater'),
    },

    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translateTypeOfLocation('creator')}
        </div>
      ),
      width: 200,
      dataIndex: 'creator',
      key: 'creator',
      align: 'center',
      ...getColumnSearchProps('creator'),
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
    router.push(ROUTERS.TYPE_OF_LOCATION_EDIT(id));
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
      headerTitle={translateTypeOfLocation('title')}
      scroll={{
        x: 'max-content',
      }}
      sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolBarRender={() => [
        <CreateTypeOfLocation key={'create'} />,
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
