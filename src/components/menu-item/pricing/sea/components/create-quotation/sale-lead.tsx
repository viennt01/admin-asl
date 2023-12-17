import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { API_PARTNER } from '@/fetcherAxios/endpoint';
import { PartnerData } from '@/components/menu-item/pricing/sea/interface';
import { getUserPartnerId } from '@/components/menu-item/pricing/sea/fetcher';
import TableSaleLead from './table-sale-lead';
interface Props {
  idPartners: string[];
}

const SaleLead: React.FC<Props> = ({ idPartners }) => {
  const [dataPartner, setDataPartner] = useState<PartnerData[]>([]);
  const [items, setItems] = useState<
    { label: string; children: JSX.Element; key: string; closable: boolean }[]
  >([]);
  const [activeKey, setActiveKey] = useState('1');

  useQuery({
    queryKey: [API_PARTNER.GET_ALL_PARTNER_BY_IDS, idPartners],
    queryFn: () => getUserPartnerId({ ids: idPartners }),
    enabled: idPartners !== undefined,
    onSuccess(data) {
      setDataPartner([]);
      if (data.status) {
        if (data.data) {
          setDataPartner(data.data);
        }
      }
    },
  });

  useEffect(() => {
    setItems(
      dataPartner?.map((item) => {
        return {
          label: item.companyName,
          children: <TableSaleLead dataTablePartner={item.userBaseDTOs} />,
          key: `${item.partnerID}`,
          closable: false,
        };
      }) || []
    );
    setActiveKey(items[0]?.key);
  }, [dataPartner]);
  const onChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <div>
      <Tabs
        hideAdd={true}
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        // onEdit={onEdit}
        items={items}
      />
    </div>
  );
};

export default SaleLead;
