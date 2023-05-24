import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';

const Error: React.FC = () => {
  const router = useRouter();
  const handleChangePage = () => {
    router.push(ROUTERS.HOME);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleChangePage}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
