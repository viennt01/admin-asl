import { appLocalStorage } from '@/utils/localstorage';
import React, { useContext, useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import { apiClient } from '@/fetcherAxios';
import { useQuery } from '@tanstack/react-query';
import { API_USER } from '@/fetcherAxios/endpoint';
import { getUserInfo } from '@/layout/fetcher';
import { AppContext } from '@/app-context';
import {
  PERMISSION_RULES,
  IPermissionRules,
  PERMISSION,
} from '@/constant/permission';

const getPriorityRole = (roles: string[]): string => {
  const priorityRoles = ['MANAGER', 'SALE', 'LINER', 'AGENT'];
  if (!roles) {
    return 'AGENT';
  }
  for (const role of priorityRoles) {
    if (roles.includes(role)) {
      return role;
    }
  }
  return 'AGENT';
};

export default function withAuthentication(ChildComponent: () => JSX.Element) {
  const Container = () => {
    const { setUserInfo, role } = useContext(AppContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const roles = ['SALE'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const roleTest = getPriorityRole(roles);
    const permissionRules = PERMISSION_RULES() as IPermissionRules;

    useQuery({
      queryKey: [API_USER.CHECK_USER],
      queryFn: () => getUserInfo(),
      onSuccess: (data) => {
        if (!data.status) {
          // remove token and redirect to home
          appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
          router.replace(ROUTERS.LOGIN);
        } else {
          if (setUserInfo) setUserInfo(data.data);
        }
      },
      onError: () => {
        // remove token and redirect to home
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      },
      retry: 0,
    });
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
    useEffect(() => {
      const currentPermission =
        permissionRules[role || 'LINER'][
          router.pathname as keyof (typeof permissionRules)[typeof role]
        ];
      if (currentPermission === PERMISSION.NO_VIEW) {
        router.push(ROUTERS.HOME);
      }
    }, [router.pathname]);
    if (loading) return <></>;
    return <ChildComponent />;
  };

  return Container;
}
