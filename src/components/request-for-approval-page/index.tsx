// import COLORS from '@/constant/color';
// import { Button } from 'antd';
// import { Form, Card, Row, Col, ConfigProvider, Table } from 'antd';
// import { ColumnsType } from 'antd/es/table';
// import dayjs from 'dayjs';
// import { Key, useRef, useState } from 'react';
// import CreateRequestForApproval from './create-request-for-approval';
// import { ROUTERS } from '@/constant/router';
// import { useRouter } from 'next/router';
import useI18n from '@/i18n/useI18N';
// import CollapseCard from '@/components/commons/collapse-card';
// import COLORS from '@/constant/color';
import { ProTable } from '@ant-design/pro-components';
// import { ProColumns, ProTable } from '@ant-design/pro-components';
// import Highlighter from 'react-highlight-words';
// import { FilterConfirmProps } from 'antd/es/table/interface';
// import style from './index.module.scss';

export interface FormValues {
  type_of_container: string;
  detail_placeholder: string;
  number_container: string;
}

export default function RequestForApprovalPage() {
  // const router = useRouter();
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // const [form] = Form.useForm<FormValues>();
  const { translate: translateRequestForApproval } =
    useI18n('requestForApproval');
  // const { translate: translateCommon } = useI18n('common');
  // const dateFormat = 'YYYY/MM/DD';

  // const onFinish = (formValues: FormValues) => {
  //   console.log(formValues);
  // };

  // const columnsSeaFreight: ColumnsType<DataType> = [
  //   {
  //     title: translateRequestForApproval('LCLMin'),
  //     width: 200,
  //     dataIndex: 'LCLMin',
  //     key: 'LCLMin',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('LCL'),
  //     width: 200,
  //     dataIndex: 'LCL',
  //     key: 'LCL',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('DC20'),
  //     width: 200,
  //     dataIndex: 'DC20',
  //     key: 'DC20',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('DC40'),
  //     width: 200,
  //     dataIndex: 'DC40',
  //     key: 'DC40',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('HC40'),
  //     width: 200,
  //     dataIndex: 'HC40',
  //     key: 'HC40',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('HC45'),
  //     width: 200,
  //     dataIndex: 'HC45',
  //     key: 'HC45',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('RF20'),
  //     width: 200,
  //     dataIndex: 'RF20',
  //     key: 'RF20',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('RF40'),
  //     width: 200,
  //     dataIndex: 'RF40',
  //     key: 'RF40',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('DB20'),
  //     width: 200,
  //     dataIndex: 'DB20',
  //     key: 'DB20',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('others'),
  //     width: 200,
  //     dataIndex: 'others',
  //     key: 'others',
  //     align: 'center',
  //   },
  //   {
  //     title: translateRequestForApproval('type'),
  //     width: 300,
  //     dataIndex: 'type',
  //     key: 'type',
  //     align: 'center',
  //   },
  // ];

  interface DataType {
    key: number;
    customerName: string;
    receiptOfGoods: string;
    delivery: string;
    fee: string;
    emptyGetOrReturn: string;
    itemType: string;
    effectiveDate: string;
    creator: string;
  }

  // const { Title } = Typography;

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i + 1,
      customerName: i % 2 === 0 ? 'MVG Đình Vũ' : 'VIMC ĐÌNH VŨ',
      receiptOfGoods: i % 2 === 0 ? 'Đóng hàng' : 'Trả hàng',
      delivery: i % 2 === 0 ? 'Giao hàng' : 'Chưa giao',
      fee: i % 2 === 0 ? '500000' : '20000',
      emptyGetOrReturn: i % 2 === 0 ? 'Nhận rỗng' : 'Trả rỗng',
      itemType: i % 2 === 0 ? 'Thực Phẩm' : 'Dầu Thực Vật Dabaco',
      effectiveDate: i % 2 === 0 ? '14/6/2023' : '14/6/2022',
      creator: 'Admin',
    });
  }

  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const searchInput = useRef<InputRef>(null);

  // const handleSearch = (
  //   selectedKeys: string[],
  //   confirm: (param?: FilterConfirmProps) => void,
  //   dataIndex: DataIndex
  // ) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters: () => void) => {
  //   clearFilters();
  //   setSearchText('');
  // };

  // type DataIndex = keyof DataType;

  // const getColumnSearchProps = (
  //   dataIndex: DataIndex
  // ): ProColumns<DataType> => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     close,
  //   }) => (
  //     <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() =>
  //           handleSearch(selectedKeys as string[], confirm, dataIndex)
  //         }
  //         style={{ marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() =>
  //             handleSearch(selectedKeys as string[], confirm, dataIndex)
  //           }
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({ closeDropdown: false });
  //             setSearchText((selectedKeys as string[])[0]);
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             close();
  //           }}
  //         >
  //           close
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered: boolean) => (
  //     <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes((value as string).toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  // const columns: ProColumns<DataType>[] = [
  //   {
  //     title: translateRequestForApproval('RequestForApproval_no'),
  //     width: 100,
  //     dataIndex: 'key',
  //     key: 'key',
  //     fixed: 'left',
  //     align: 'center',
  //     sorter: (a, b) => a.key - b.key,
  //   },
  //   {
  //     title: translateRequestForApproval('customer_name'),
  //     width: 250,
  //     dataIndex: 'customerName',
  //     key: 'customerName',
  //     fixed: 'left',
  //     align: 'center',
  //     ...getColumnSearchProps('customerName'),
  //     // onFilter: (value: string, record) => record.name.startsWith(value),
  //   },
  //   {
  //     title: translateRequestForApproval('receipt_of_goods'),
  //     width: 250,
  //     dataIndex: 'receiptOfGoods',
  //     key: 'receiptOfGoods',
  //     align: 'center',
  //     ...getColumnSearchProps('receiptOfGoods'),
  //   },
  //   {
  //     title: translateRequestForApproval('delivery'),
  //     dataIndex: 'delivery',
  //     key: 'delivery',
  //     align: 'center',
  //     ...getColumnSearchProps('delivery'),
  //     width: 200,
  //   },
  //   {
  //     title: translateRequestForApproval('fee'),
  //     dataIndex: 'fee',
  //     key: 'fee',
  //     align: 'center',
  //     ...getColumnSearchProps('fee'),
  //     width: 150,
  //   },
  //   {
  //     title: translateRequestForApproval('empty_get_or_return'),
  //     width: 250,
  //     dataIndex: 'emptyGetOrReturn',
  //     key: 'emptyGetOrReturn',
  //     align: 'center',
  //     ...getColumnSearchProps('emptyGetOrReturn'),
  //   },
  //   {
  //     title: translateRequestForApproval('item_type'),
  //     dataIndex: 'itemType',
  //     width: 200,
  //     key: 'itemType',
  //     align: 'center',
  //     ...getColumnSearchProps('itemType'),
  //   },
  //   {
  //     title: translateRequestForApproval('effective_date'),
  //     width: 150,
  //     dataIndex: 'effectiveDate',
  //     key: 'effectiveDate',
  //     align: 'center',
  //     ...getColumnSearchProps('effectiveDate'),
  //   },
  //   {
  //     title: translateRequestForApproval('creator'),
  //     width: 200,
  //     dataIndex: 'creator',
  //     key: 'creator',
  //     align: 'center',
  //     ...getColumnSearchProps('creator'),
  //   },
  //   {
  //     key: 'operation',
  //     fixed: 'right',
  //     width: 50,
  //     align: 'center',
  //     dataIndex: 'key',
  //     render: (value) => (
  //       <Button
  //         onClick={() => handleEditCustomer(value as string)}
  //         icon={<EditOutlined />}
  //       ></Button>
  //     ),
  //   },
  // ];

  // const handleEditCustomer = (id: string) => {
  //   router.push(ROUTERS.REQUEST_FOR_APPROVAL_EDIT(id));
  // };

  // const handleSelectionChange = (selectedRowKeys: Key[]) => {
  //   setSelectedRowKeys(selectedRowKeys);
  // };

  return (
    <ProTable<DataType>
      style={{ marginTop: '8px' }}
      search={false}
      dateFormatter="string"
      headerTitle={translateRequestForApproval('title')}
      // scroll={{
      //   x: 'max-content',
      // }}
      // sticky={{ offsetHeader: 0 }}
      options={{
        fullScreen: true,
        search: true,
      }}
    />

    // <div style={{ padding: '24px 0' }}>
    //   <ConfigProvider
    //     theme={{
    //       token: {
    //         colorPrimary: COLORS.GREEN,
    //       },
    //     }}
    //   >
    //     <Form
    //       form={form}
    //       onFinish={onFinish}
    //       autoComplete="off"
    //       layout="vertical"
    //     >
    //       <CollapseCard
    //         title={translateRequestForApproval('title_sea_freight')}
    //         style={{ marginBottom: '24px' }}
    //         defaultActive={true}
    //       >
    //         <Row gutter={16}>
    //           <Col lg={24} span={24}>
    //             <Card style={{ marginBottom: 24 }}>
    //               <Table columns={columnsSeaFreight} dataSource={data} />
    //             </Card>
    //           </Col>
    //         </Row>
    //       </CollapseCard>

    //       <CollapseCard
    //         title={translateRequestForApproval('title_local_chart')}
    //         style={{ marginBottom: '24px' }}
    //         defaultActive={true}
    //       >
    //         <Row gutter={16}>
    //           <Col lg={24} span={24}>
    //             <Card style={{ marginBottom: 24 }}>
    //               <Table columns={columnsSeaFreight} dataSource={data} />
    //             </Card>
    //           </Col>
    //         </Row>
    //       </CollapseCard>
    //     </Form>
    //   </ConfigProvider>
    // </div>
  );
}
