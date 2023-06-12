import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space } from 'antd';
import { Key, useEffect, useRef, useState } from 'react';
import CreateDebtor from './create-debtor';
import { ROUTERS } from '@/constant/router';
import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import enUS from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import Highlighter from 'react-highlight-words';
import { FilterConfirmProps } from 'antd/es/table/interface';
import style from './index.module.scss';

export default function DebtorPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { translate: translateDebtor } = useI18n('debtor');
  const { translate: translateCommon } = useI18n('common');
  const [locale, setLocale] = useState(enUS);

  interface DataType {
    key: number;
    theOccurrence: string;
    debtorCode: string;
    debtorName: string;
    debtorTaxCode: string;
    debtorAddress: string;
    debtorPhone: string;
    debtorEmail: string;
    contact: string;
    position: string;
    classification: string;
    accountNumber: string;
    bankName: string;
    provinceOrCity: string;
    part: string;
    branch: string;
    customerName: string;
    note: string;
    creator: string;
  }

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      theOccurrence: '2023',
      debtorCode: 'AD12345',
      debtorName: 'Công ty CP ABC',
      debtorTaxCode: '123456789',
      debtorAddress: '249 Lê Văn Sĩ, Phường 4, Quận 10, Thành phố Hồ Chí Minh',
      debtorPhone: '0951231548',
      debtorEmail: 'abc@gmail.com.vn',
      contact: 'Nguyễn Thị A',
      position: 'Kế Toán',
      classification: '',
      accountNumber: '123456789123',
      bankName: 'Vietcombank',
      provinceOrCity: 'Hồ Chí Minh',
      part: 'Marketing',
      branch: 'Thành phố Hồ Chí Minh',
      customerName: 'Hóa Chất Việt Trì',
      note: 'test',
      creator: 'Nguyễn Văn C',
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
      title: translateDebtor('the_occurrence'),
      width: 150,
      dataIndex: 'theOccurrence',
      key: 'theOccurrence',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: translateDebtor('debtor_code'),
      width: 150,
      dataIndex: 'debtorCode',
      key: 'debtorCode',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('debtorCode'),
    },
    {
      title: translateDebtor('debtor_name'),
      width: 250,
      dataIndex: 'debtorName',
      key: 'debtorName',
      fixed: 'left',
      align: 'center',
      ...getColumnSearchProps('debtorName'),
      // onFilter: (value: string, record) => record.name.startsWith(value),
    },
    {
      title: translateDebtor('debtor_tax_code'),
      width: 200,
      dataIndex: 'debtorTaxCode',
      key: 'debtorTaxCode',
      align: 'center',
      ...getColumnSearchProps('debtorTaxCode'),
    },
    {
      title: translateDebtor('debtor_address'),
      width: 300,
      dataIndex: 'debtorAddress',
      key: 'debtorAddress',
      align: 'center',
      ...getColumnSearchProps('debtorAddress'),
    },
    {
      title: translateDebtor('debtor_phone'),
      width: 150,
      dataIndex: 'debtorPhone',
      key: 'debtorPhone',
      align: 'center',
      ...getColumnSearchProps('debtorPhone'),
    },
    {
      title: translateDebtor('debtor_email'),
      width: 200,
      dataIndex: 'debtorEmail',
      key: 'debtorEmail',
      align: 'center',
      ...getColumnSearchProps('debtorEmail'),
    },
    {
      title: translateDebtor('contact'),
      width: 150,
      dataIndex: 'contact',
      key: 'contact',
      align: 'center',
      ...getColumnSearchProps('contact'),
    },
    {
      title: translateDebtor('position'),
      width: 200,
      dataIndex: 'position',
      key: 'position',
      align: 'center',
      ...getColumnSearchProps('position'),
    },
    {
      title: translateDebtor('classification'),
      width: 200,
      dataIndex: 'classification',
      key: 'classification',
      align: 'center',
      ...getColumnSearchProps('classification'),
    },
    {
      title: translateDebtor('account_number'),
      width: 150,
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      align: 'center',
      ...getColumnSearchProps('accountNumber'),
    },
    {
      title: translateDebtor('bank_name'),
      width: 300,
      dataIndex: 'contact',
      key: 'contact',
      align: 'center',
      ...getColumnSearchProps('contact'),
    },
    {
      title: translateDebtor('province_or_City'),
      width: 250,
      dataIndex: 'provinceOrCity',
      key: 'provinceOrCity',
      align: 'center',
      ...getColumnSearchProps('provinceOrCity'),
    },
    {
      title: translateDebtor('part'),
      width: 200,
      dataIndex: 'part',
      key: 'part',
      align: 'center',
      ...getColumnSearchProps('part'),
    },
    {
      title: translateDebtor('branch'),
      width: 200,
      dataIndex: 'branch',
      key: 'branch',
      align: 'center',
      ...getColumnSearchProps('branch'),
    },
    {
      title: translateDebtor('customer_name'),
      width: 200,
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      ...getColumnSearchProps('customerName'),
    },
    {
      title: translateDebtor('note'),
      width: 300,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      ...getColumnSearchProps('note'),
    },
    {
      title: translateDebtor('creator'),
      width: 250,
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
          onClick={() => handleEditDebtor(value as string)}
          icon={<EditOutlined />}
        ></Button>
      ),
    },
  ];

  const handleEditDebtor = (id: string) => {
    router.push(ROUTERS.DEBTOR_EDIT(id));
  };

  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  useEffect(() => {
    switch (appLocalStorage.get(LOCAL_STORAGE_KEYS.LANGUAGE)) {
      case 'en':
        setLocale(enUS);
        break;
      case 'vi':
        setLocale(vi_VN);
        break;
      default:
        setLocale(vi_VN);
        break;
    }
  }, [router]);

  return (
    <ConfigProvider locale={locale}>
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
        headerTitle={translateDebtor('title')}
        scroll={{
          x: 'max-content',
        }}
        sticky={{ offsetHeader: 0 }}
        options={{
          fullScreen: true,
          search: true,
        }}
        toolBarRender={() => [
          <CreateDebtor key={'create'} />,
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
    </ConfigProvider>
  );
}
