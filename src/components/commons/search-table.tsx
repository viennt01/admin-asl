import { ProColumns } from '@ant-design/pro-components';
import { Button, Input, InputRef, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useRef } from 'react';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import useI18n from '@/i18n/useI18N';
import COLORS from '@/constant/color';

type SelectSearch<T> = {
  [key in keyof T]: {
    label: string;
    value: string;
  };
};

interface ColumnSearchPropsProps<T> {
  handleSearch: (
    selectedKeys: string,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof T
  ) => void;
  handleReset: (clearFilters: () => void, dataIndex: keyof T) => void;
  queryParams: T;
  selectedKeyShow: SelectSearch<T>;
  setSelectedKeyShow: React.Dispatch<React.SetStateAction<SelectSearch<T>>>;
  dataIndex: keyof T;
}

type ColumnSearchProps<T> = ProColumns<T> & {
  props: ColumnSearchPropsProps<T>;
};

export const ColumnSearchTableProps = <T,>({
  props: {
    handleSearch,
    handleReset,
    queryParams,
    selectedKeyShow,
    setSelectedKeyShow,
    dataIndex,
  },
}: {
  props: ColumnSearchPropsProps<T>;
}) => {
  const searchInput = useRef<InputRef>(null);
  const { translate: translateCommon } = useI18n('common');
  const getColumnSearchProps: ColumnSearchProps<T>['filterDropdown'] = ({
    confirm,
    clearFilters,
    close,
  }) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={translateCommon('search')}
        value={selectedKeyShow[dataIndex]?.value}
        onChange={(e) => {
          setSelectedKeyShow((prevData) => ({
            ...prevData,
            [dataIndex]: { label: dataIndex, value: e.target.value },
          }));
        }}
        onPressEnter={() =>
          handleSearch(selectedKeyShow[dataIndex].value, confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(
              selectedKeyShow[dataIndex]?.value || '',
              confirm,
              dataIndex
            )
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          {translateCommon('search')}
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters, dataIndex)}
          size="small"
          style={{ width: 90 }}
        >
          {translateCommon('reset')}
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          {translateCommon('close')}
        </Button>
      </Space>
    </div>
  );

  return {
    filterDropdown: getColumnSearchProps,
    filterIcon: () => {
      const checkValueSelectedKeyShow = selectedKeyShow[dataIndex]?.value || '';
      return (
        <SearchOutlined
          style={{
            color:
              checkValueSelectedKeyShow.length !== 0 ||
              queryParams[dataIndex]?.toString().length !== 0
                ? COLORS.SEARCH.FILTER_ACTIVE
                : undefined,
          }}
        />
      );
    },
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[selectedKeyShow[dataIndex]?.value]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ),
  };
};
