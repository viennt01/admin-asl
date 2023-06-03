import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';

const Error: React.FC = () => {
  const { translate: translateCommon } = useI18n('common');
  const router = useRouter();
  const handleChangePage = () => {
    router.push(ROUTERS.HOME);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle={translateCommon('notification_404')}
      extra={
        <Button type="primary" onClick={handleChangePage}>
          {translateCommon('button_back_home')}
        </Button>
      }
    />
  );
};

export default Error;

import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'home']);
