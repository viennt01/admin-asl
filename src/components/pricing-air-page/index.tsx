import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreatePricingAir from './create-pricing-air';
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

export default function PricingSeaPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePricingAir } = useI18n('pricingAir');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    code: string;
    origin: string;
    destination: string;
    vendor: string;
    carrier: string;
    minQty: string;
    minLess10: string;
    less45: string;
    more45: string;
    more100: string;
    more300: string;
    more500: string;
    more1000: string;
    FSC: string;
    SSC: string;
    GW: boolean;
    curr: string;
    dateUpdate: string;
    validity: string;
    tt: string;
    freq: string;
    cutOff: string;
    modify: string;
    status: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      code: 'ASL19092014',
      origin: 'HO CHI MINH CITY',
      destination: 'INCHON, KOREA',
      vendor: 'KORCHINA',
      carrier: '',
      minQty: '',
      minLess10: '',
      less45: '',
      more45: '2.200',
      more100: '1.600',
      more300: '1.400',
      more500: '0.950',
      more1000: '0.850',
      FSC: '0.540',
      SSC: '0.100',
      GW: true,
      curr: '',
      dateUpdate: '19/09/2014',
      validity: '20/09/2014',
      tt: '',
      freq: '',
      cutOff: '',
      modify: '',
      status: i % 2 === 1 ? 'Draft' : 'Active',
      dateCreated: '19/09/2014',
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
      title: translatePricingAir('code'),
      width: 80,
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('code'),
    },
    {
      title: translatePricingAir('origin'),
      width: 250,
      dataIndex: 'origin',
      key: 'origin',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('origin'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePricingAir('destination'),
      width: 250,
      dataIndex: 'destination',
      key: 'destination',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('destination'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePricingAir('vendor'),
      width: 200,
      dataIndex: 'vendor',
      key: 'vendor',
      align: 'center',
      ...getColumnSearchProps('vendor'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePricingAir('carrier'),
      width: 200,
      dataIndex: 'carrier',
      key: 'carrier',
      align: 'center',
      ...getColumnSearchProps('carrier'),
    },
    {
      title: translatePricingAir('min_qty'),
      width: 150,
      dataIndex: 'minQty',
      key: 'minQty',
      align: 'center',
      ...getColumnSearchProps('minQty'),
    },
    {
      title: translatePricingAir('min_less10'),
      width: 150,
      dataIndex: 'minLess10',
      key: 'minLess10',
      align: 'center',
      ...getColumnSearchProps('minLess10'),
    },
    {
      title: translatePricingAir('less45'),
      width: 150,
      dataIndex: 'less45',
      key: 'less45',
      align: 'center',
      ...getColumnSearchProps('less45'),
    },
    {
      title: translatePricingAir('more45'),
      width: 150,
      dataIndex: 'more45',
      key: 'more45',
      align: 'center',
      ...getColumnSearchProps('more45'),
    },
    {
      title: translatePricingAir('more100'),
      width: 150,
      dataIndex: 'more100',
      key: 'more100',
      align: 'center',
      ...getColumnSearchProps('more100'),
    },
    {
      title: translatePricingAir('FSC'),
      width: 150,
      dataIndex: 'FSC',
      key: 'FSC',
      align: 'center',
      ...getColumnSearchProps('FSC'),
    },
    {
      title: translatePricingAir('SSC'),
      width: 150,
      dataIndex: 'SSC',
      key: 'SSC',
      align: 'center',
      ...getColumnSearchProps('SSC'),
    },
    {
      title: translatePricingAir('GW'),
      width: 150,
      dataIndex: 'GW',
      key: 'GW',
      align: 'center',
      valueType: 'checkbox',
      // ...getColumnSearchProps('GW'),
      render: (value) =>
        value ? <CheckSquareOutlined /> : <CloseSquareOutlined />,
    },
    {
      title: translatePricingAir('curr'),
      width: 200,
      dataIndex: 'curr',
      key: 'curr',
      align: 'center',
      ...getColumnSearchProps('curr'),
    },
    {
      title: translatePricingAir('date_update'),
      width: 200,
      dataIndex: 'dateUpdate',
      key: 'dateUpdate',
      align: 'center',
      ...getColumnSearchProps('dateUpdate'),
    },
    {
      title: translatePricingAir('validity'),
      width: 200,
      dataIndex: 'validity',
      key: 'validity',
      align: 'center',
      ...getColumnSearchProps('validity'),
    },
    {
      title: translatePricingAir('tt'),
      width: 200,
      dataIndex: 'tt',
      key: 'tt',
      align: 'center',
      ...getColumnSearchProps('tt'),
    },
    {
      title: translatePricingAir('freq'),
      width: 200,
      dataIndex: 'freq',
      key: 'freq',
      align: 'center',
      ...getColumnSearchProps('freq'),
    },
    {
      title: translatePricingAir('cut_off'),
      width: 200,
      dataIndex: 'cutOff',
      key: 'cutOff',
      align: 'center',
      ...getColumnSearchProps('cutOff'),
    },
    {
      title: translatePricingAir('modify'),
      width: 200,
      dataIndex: 'modify',
      key: 'modify',
      align: 'center',
      ...getColumnSearchProps('modify'),
    },
    {
      title: translatePricingAir('status'),
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
          {translatePricingAir('date_created')}
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
          {translatePricingAir('creator')}
        </div>
      ),
      width: 200,
      dataIndex: 'creator',
      key: 'creator',
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
    router.push(ROUTERS.AIR_PRICING_EDIT(id));
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
      headerTitle={translatePricingAir('title')}
      scroll={{
        x: 'max-content',
      }}
      sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolBarRender={() => [
        <CreatePricingAir key={'create'} />,
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
