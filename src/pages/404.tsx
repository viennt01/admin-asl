import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import useI18n from '@/i18n/useI18N';
import { AppLayout } from '@/layout/authen-layout';
import { PageWithNoLayout } from '@/layout/no-layout';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { appLocalStorage } from '@/utils/localstorage';
function Error() {
  const { translate: translateCommon } = useI18n('common');
  const router = useRouter();
  const handleChangePage = () => {
    router.push(ROUTERS.HOME);
  };
  const isServer = typeof window === 'undefined';
  if (!isServer) {
    const checkToken = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
    if (!checkToken) {
      router.push(ROUTERS.LOGIN);
      return;
    }
  }
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
      style={{ backgroundColor: '#fff', height: '100vh' }}
    />
  );
}

const isServer = typeof window === 'undefined';
if (!isServer) {
  const checkToken = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
  Error.getLayout = () => {
    if (!checkToken) {
      return PageWithNoLayout;
    } else {
      return AppLayout;
    }
  };
}

export default Error;

import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'home']);
