import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { Key, useRef, useState } from 'react';
import CreatePricingTrucking from './create-pricing-trucking';
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

export default function PricingTruckingPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translatePricingTrucking } = useI18n('pricingTrucking');
  const { translate: translateCommon } = useI18n('common');

  interface DataType {
    no: number;
    POL: string;
    POD: string;
    destination: string;
    country: string;
    vendor: string;
    carrier: string;
    service: string;
    commodity: string;
    LCLMin: string;
    LCL: string;
    DC20: string;
    DC40: string;
    HC40: string;
    HC45: string;
    RF20: string;
    RF40: string;
    DB20: string;
    others: string;
    type: string;
    currency: string;
    vat: string;
    effectDate: string;
    validity: string;
    freq: string;
    Cutoff: string;
    TT: string;
    inlAddon: string;
    emptyReturn: string;
    amend: string;
    DEM: string;
    DET: string;
    STO: string;
    modifyDate: string;
    status: string;
    note: string;
    dateCreated: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      no: i + 1,
      POL: 'HO CHI MINH CITY',
      POD: 'NORTH A...',
      destination: 'AUSTIN, TX USA',
      country: 'UNITED STATES',
      vendor: '',
      carrier: i % 2 ? 'OOCL' : 'ONE VN',
      service: '',
      commodity: '',
      LCLMin: '',
      LCL: '60.000',
      DC20: '',
      DC40: '',
      HC40: '',
      HC45: '',
      RF20: '',
      RF40: '',
      DB20: '',
      others: '',
      type: '',
      currency: 'USA',
      vat: '',
      effectDate: '01/05/2023',
      validity: '31/07/2023',
      freq: 'FRI',
      Cutoff: '',
      TT: '30 - 40',
      inlAddon: '',
      emptyReturn: '',
      amend: '',
      DEM: '0',
      DET: '0',
      STO: '0',
      modifyDate: '30/06/2023',
      status: i % 2 === 1 ? 'Draft' : 'Active',
      note: '',
      dateCreated: '26/04/2023',
      creator: 'ASL',
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
      title: translatePricingTrucking('no'),
      width: 80,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('no'),
    },
    {
      title: translatePricingTrucking('POL'),
      width: 200,
      dataIndex: 'POL',
      key: 'POL',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('POL'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePricingTrucking('POD'),
      width: 200,
      dataIndex: 'POD',
      key: 'POD',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('POD'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePricingTrucking('destination'),
      width: 300,
      dataIndex: 'destination',
      key: 'destination',
      align: 'center',
      ...getColumnSearchProps('destination'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translatePricingTrucking('country'),
      width: 200,
      dataIndex: 'country',
      key: 'country',
      align: 'center',
      ...getColumnSearchProps('country'),
    },
    {
      title: translatePricingTrucking('vendor'),
      width: 200,
      dataIndex: 'vendor',
      key: 'vendor',
      align: 'center',
      ...getColumnSearchProps('vendor'),
    },
    {
      title: translatePricingTrucking('carrier'),
      width: 150,
      dataIndex: 'carrier',
      key: 'carrier',
      align: 'center',
      ...getColumnSearchProps('carrier'),
    },
    {
      title: translatePricingTrucking('service'),
      width: 300,
      dataIndex: 'service',
      key: 'service',
      align: 'center',
      ...getColumnSearchProps('service'),
    },
    {
      title: translatePricingTrucking('commodity'),
      width: 300,
      dataIndex: 'commodity',
      key: 'commodity',
      align: 'center',
      ...getColumnSearchProps('commodity'),
    },
    {
      title: translatePricingTrucking('LCLMin'),
      width: 200,
      dataIndex: 'LCLMin',
      key: 'LCLMin',
      align: 'center',
      ...getColumnSearchProps('LCLMin'),
    },
    {
      title: translatePricingTrucking('LCL'),
      width: 200,
      dataIndex: 'LCL',
      key: 'LCL',
      align: 'center',
      ...getColumnSearchProps('LCL'),
    },
    {
      title: translatePricingTrucking('DC20'),
      width: 200,
      dataIndex: 'DC20',
      key: 'DC20',
      align: 'center',
      ...getColumnSearchProps('DC20'),
    },
    {
      title: translatePricingTrucking('DC40'),
      width: 200,
      dataIndex: 'DC40',
      key: 'DC40',
      align: 'center',
      ...getColumnSearchProps('DC40'),
    },
    {
      title: translatePricingTrucking('HC40'),
      width: 200,
      dataIndex: 'HC40',
      key: 'HC40',
      align: 'center',
      ...getColumnSearchProps('HC40'),
    },
    {
      title: translatePricingTrucking('HC45'),
      width: 200,
      dataIndex: 'HC45',
      key: 'HC45',
      align: 'center',
      ...getColumnSearchProps('HC45'),
    },
    {
      title: translatePricingTrucking('RF20'),
      width: 200,
      dataIndex: 'RF20',
      key: 'RF20',
      align: 'center',
      ...getColumnSearchProps('RF20'),
    },
    {
      title: translatePricingTrucking('RF40'),
      width: 200,
      dataIndex: 'RF40',
      key: 'RF40',
      align: 'center',
      ...getColumnSearchProps('RF40'),
    },
    {
      title: translatePricingTrucking('DB20'),
      width: 200,
      dataIndex: 'DB20',
      key: 'DB20',
      align: 'center',
      ...getColumnSearchProps('DB20'),
    },
    {
      title: translatePricingTrucking('others'),
      width: 200,
      dataIndex: 'others',
      key: 'others',
      align: 'center',
      ...getColumnSearchProps('others'),
    },
    {
      title: translatePricingTrucking('type'),
      width: 300,
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      ...getColumnSearchProps('type'),
    },
    {
      title: translatePricingTrucking('currency'),
      width: 200,
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
      ...getColumnSearchProps('currency'),
    },
    {
      title: translatePricingTrucking('vat'),
      width: 200,
      dataIndex: 'vat',
      key: 'vat',
      align: 'center',
      ...getColumnSearchProps('vat'),
    },
    {
      title: translatePricingTrucking('effect_date'),
      width: 200,
      dataIndex: 'effectDate',
      key: 'effectDate',
      align: 'center',
      ...getColumnSearchProps('effectDate'),
    },
    {
      title: translatePricingTrucking('validity'),
      width: 200,
      dataIndex: 'validity',
      key: 'validity',
      align: 'center',
      ...getColumnSearchProps('validity'),
    },
    {
      title: translatePricingTrucking('freq'),
      width: 150,
      dataIndex: 'freq',
      key: 'freq',
      align: 'center',
      ...getColumnSearchProps('freq'),
    },
    {
      title: translatePricingTrucking('Cutoff'),
      width: 180,
      dataIndex: 'Cutoff',
      key: 'Cutoff',
      align: 'center',
      ...getColumnSearchProps('Cutoff'),
    },
    {
      title: translatePricingTrucking('TT'),
      width: 200,
      dataIndex: 'TT',
      key: 'TT',
      align: 'center',
      ...getColumnSearchProps('TT'),
    },
    {
      title: translatePricingTrucking('inl_addon'),
      width: 200,
      dataIndex: 'inlAddon',
      key: 'inlAddon',
      align: 'center',
      ...getColumnSearchProps('inlAddon'),
    },
    {
      title: translatePricingTrucking('empty_return'),
      width: 200,
      dataIndex: 'emptyReturn',
      key: 'emptyReturn',
      align: 'center',
      ...getColumnSearchProps('emptyReturn'),
    },
    {
      title: translatePricingTrucking('amend'),
      width: 200,
      dataIndex: 'amend',
      key: 'amend',
      align: 'center',
      ...getColumnSearchProps('amend'),
    },
    {
      title: translatePricingTrucking('DEM'),
      width: 200,
      dataIndex: 'DEM',
      key: 'DEM',
      align: 'center',
      ...getColumnSearchProps('DEM'),
    },
    {
      title: translatePricingTrucking('STO'),
      width: 200,
      dataIndex: 'STO',
      key: 'STO',
      align: 'center',
      ...getColumnSearchProps('STO'),
    },
    {
      title: translatePricingTrucking('modify_date'),
      width: 200,
      dataIndex: 'modifyDate',
      key: 'modifyDate',
      align: 'center',
      ...getColumnSearchProps('modifyDate'),
    },
    {
      title: translatePricingTrucking('status'),
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
      title: translatePricingTrucking('note'),
      width: 200,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      ...getColumnSearchProps('note'),
    },
    {
      title: (
        <div style={{ textTransform: 'uppercase' }}>
          {translatePricingTrucking('date_created')}
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
          {translatePricingTrucking('creator')}
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
    router.push(ROUTERS.TRUCKING_PRICING_EDIT(id));
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
      headerTitle={translatePricingTrucking('title')}
      scroll={{
        x: 'max-content',
      }}
      sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
      toolBarRender={() => [
        <CreatePricingTrucking key={'create'} />,
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
