import { appLocalStorage } from '@/utils/localstorage';
import React, { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import { apiClient } from '@/fetcherAxios';

export default function withAuthentication(ChildComponent: () => JSX.Element) {
  const Container = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const token = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
      if (!token) {
        if (router.pathname !== ROUTERS.LOGIN) {
          router.push(ROUTERS.LOGIN);
        }
      } else {
        // Đặt token vào apiClient
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });

        if (router.pathname === ROUTERS.LOGIN) {
          router.push(ROUTERS.HOME);
        }
      }
      setLoading(false);
    }, [router.pathname]);
    if (loading) return <></>;
    return <ChildComponent />;
  };

  return Container;
}
