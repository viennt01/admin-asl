import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import COLORS from '@/constant/color';
import {
  ColumnsState,
  Key,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Input, TablePaginationConfig, Tooltip } from 'antd';
import style from './index.module.scss';
import useI18n from '@/i18n/useI18N';
import { ChangeEvent, MouseEvent, useContext } from 'react';
import { IPaginationOfAntd } from '@/components/commons/table/table-default';
import { FilterValue } from 'antd/lib/table/interface';
import { STATUS_ALL_LABELS } from '@/constant/form';
import { AppContext } from '@/app-context';
import { ROLE } from '@/constant/permission';

export const COUNT_DATA = 2147483640;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props<T extends Record<string, any>> {
  dataTable: T[];
  columns: ProColumns<T>[];
  headerTitle?: string;
  selectedRowKeys?: React.Key[];
  handleSelectionChange?: (selectedRowKeys: Key[]) => void;
  handlePaginationChange: (page: number, size: number) => void;
  handleChangeInputSearchAll?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchInputKeyAll?: (value: string) => void;
  valueSearchAll?: string;
  handleOnDoubleClick: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: MouseEvent<any, globalThis.MouseEvent>,
    record: T
  ) => void;
  handleCreate?: () => void;
  handleCreateQuotation?: () => void;
  showPropsConfirmDelete?: () => void;
  refreshingQuery?: () => void;
  refreshingLoading?: boolean;
  pagination: IPaginationOfAntd;
  handleColumnsStateChange?: (map: Record<string, ColumnsState>) => void;
  columnsStateMap?: Record<string, ColumnsState>;
  handleSearchSelect?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => void;
  checkTableMaster: boolean;
  importTableData?: () => void;
  exportLoading?: boolean;
  exportTableData?: () => void;
  handleApproveAndReject?: (status: string) => void;
  itemDataQuotation?: React.Key[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<string, any>>({
  dataTable,
  columns,
  headerTitle,
  selectedRowKeys,
  handleSelectionChange,
  handlePaginationChange,
  handleChangeInputSearchAll,
  handleSearchInputKeyAll,
  valueSearchAll,
  handleOnDoubleClick,
  handleCreate,
  handleCreateQuotation,
  showPropsConfirmDelete,
  refreshingQuery,
  refreshingLoading,
  pagination,
  handleColumnsStateChange,
  columnsStateMap,
  handleSearchSelect,
  checkTableMaster,
  importTableData,
  exportLoading,
  exportTableData,
  handleApproveAndReject,
  itemDataQuotation,
}: Props<T>) => {
  const { translate: translateCommon } = useI18n('common');
  const dataSourceUnknown = dataTable as unknown;
  const { role } = useContext(AppContext);

  return (
    <ProTable<T>
      headerTitle={headerTitle}
      className={style.table}
      dataSource={dataSourceUnknown as T[]}
      columns={columns}
      style={{ marginTop: '8px' }}
      rowKey="key"
      rowSelection={
        checkTableMaster && {
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: handleSelectionChange,
        }
      }
      pagination={{
        position: ['bottomCenter'],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        ...pagination,
        onChange: handlePaginationChange,
      }}
      search={false}
      scroll={{
        x: 'max-content',
      }}
      sticky={checkTableMaster && { offsetHeader: 0 }}
      options={{
        fullScreen: checkTableMaster,
        reload: false,
        setting: checkTableMaster,
        density: checkTableMaster,
      }}
      onColumnsStateChange={handleColumnsStateChange}
      columnsStateMap={columnsStateMap}
      onRow={(record) => {
        return {
          onDoubleClick: (e) => {
            handleOnDoubleClick(e, record);
          },
        };
      }}
      onChange={handleSearchSelect}
      toolBarRender={() =>
        checkTableMaster
          ? [
              <Input.Search
                key={'Search'}
                placeholder={translateCommon('search')}
                onSearch={handleSearchInputKeyAll}
                value={valueSearchAll}
                onChange={(e) =>
                  handleChangeInputSearchAll && handleChangeInputSearchAll(e)
                }
                style={{
                  display: handleChangeInputSearchAll ? '' : 'none',
                }}
              />,
              <Button
                key={'createQuotation'}
                icon={<PlusOutlined />}
                style={{
                  marginRight: '4px',
                  backgroundColor:
                    selectedRowKeys?.length === 0 ? '' : COLORS.BRIGHT,
                  color: selectedRowKeys?.length === 0 ? '' : COLORS.GREEN,
                  borderColor:
                    selectedRowKeys?.length === 0 ? '' : COLORS.GREEN,
                  fontWeight: '500',
                  display:
                    handleCreateQuotation === undefined ||
                    !(role === ROLE.MANAGER || role === ROLE.SALE)
                      ? 'none'
                      : '',
                }}
                onClick={handleCreateQuotation}
                disabled={itemDataQuotation?.length === 0}
              >
                {translateCommon('button_create_quotation')}
              </Button>,
              <Button
                key={'create'}
                icon={<PlusOutlined />}
                style={{
                  marginRight: '4px',
                  backgroundColor: COLORS.BRIGHT,
                  color: COLORS.GREEN,
                  borderColor: COLORS.GREEN,
                  fontWeight: '500',
                  display: handleCreate ? '' : 'none',
                }}
                onClick={handleCreate}
              >
                {translateCommon('button_add')}
              </Button>,
              <Button
                key={'delete'}
                icon={<DeleteOutlined />}
                style={{
                  backgroundColor: COLORS.RED,
                  color: COLORS.WHITE,
                  borderColor: COLORS.RED,
                  fontWeight: '500',
                  display: showPropsConfirmDelete ? '' : 'none',
                }}
                onClick={showPropsConfirmDelete}
              >
                {translateCommon('button_delete')}
              </Button>,

              <Tooltip title="Import data" key={'import-data"'}>
                <Button
                  icon={<CloudUploadOutlined />}
                  size="large"
                  onClick={importTableData}
                  style={{
                    width: 32,
                    height: 32,
                    padding: '3px 6px 0px 6px',
                    display: importTableData ? '' : 'none',
                  }}
                />
              </Tooltip>,
              <Tooltip title="Export data" key={'export-data'}>
                <Button
                  loading={exportLoading}
                  icon={<CloudDownloadOutlined />}
                  size="large"
                  onClick={exportTableData}
                  style={{
                    width: 32,
                    height: 32,
                    padding: '3px 6px 0px 6px',
                    display: exportTableData ? '' : 'none',
                  }}
                />
              </Tooltip>,
              <Tooltip
                title={translateCommon('button_bottom_form.approval')}
                key={'approve'}
              >
                <Button
                  loading={exportLoading}
                  icon={<CheckOutlined />}
                  size="large"
                  disabled={selectedRowKeys?.length === 0 ? true : false}
                  onClick={() =>
                    handleApproveAndReject &&
                    handleApproveAndReject(STATUS_ALL_LABELS.ACTIVE)
                  }
                  style={{
                    fontWeight: '500',
                    height: '32px',
                    fontSize: '14px',
                    padding: '4px 15px',
                    borderRadius: '6px',
                    color: selectedRowKeys?.length === 0 ? '' : COLORS.SUCCESS,
                    borderColor:
                      selectedRowKeys?.length === 0 ? '' : COLORS.SUCCESS,
                    display: handleApproveAndReject ? '' : 'none',
                  }}
                >
                  {translateCommon('button_bottom_form.approval')}
                </Button>
              </Tooltip>,
              <Tooltip
                title={translateCommon('button_bottom_form.reject')}
                key={'reject'}
              >
                <Button
                  loading={exportLoading}
                  icon={<CloseOutlined />}
                  size="large"
                  disabled={selectedRowKeys?.length === 0 ? true : false}
                  onClick={() =>
                    handleApproveAndReject &&
                    handleApproveAndReject(STATUS_ALL_LABELS.REJECT)
                  }
                  style={{
                    fontWeight: '500',
                    height: '32px',
                    fontSize: '14px',
                    padding: '4px 15px',
                    borderRadius: '6px',
                    color: selectedRowKeys?.length === 0 ? '' : COLORS.RED,
                    borderColor:
                      selectedRowKeys?.length === 0 ? '' : COLORS.RED,
                    display: handleApproveAndReject ? '' : 'none',
                  }}
                >
                  {translateCommon('button_bottom_form.reject')}
                </Button>
              </Tooltip>,
              <Tooltip title="Refresh data" key={'refresh-data'}>
                <Button
                  key={'refresh'}
                  onClick={refreshingQuery}
                  icon={<ReloadOutlined />}
                  loading={refreshingLoading}
                  style={{
                    width: 32,
                    height: 32,
                    padding: 6,
                    display: refreshingQuery ? '' : 'none',
                  }}
                />
              </Tooltip>,
            ]
          : []
      }
    />
  );
};
export default Table;
