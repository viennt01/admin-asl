// import { AppContext } from '@/app-context';
import Head from 'next/head';
// import { useContext } from 'react';

interface Props {
  children: React.ReactNode;
}
export function PageWithNoLayout(props: Props) {
  // const { merchantInfo } = useContext(AppContext);

  return (
    <>
      <Head>
        {/* <link rel="favicon" href={merchantInfo?.config?.favicon_url} /> */}
        {/* <link rel="shortcut icon" href={merchantInfo?.config?.favicon_url} /> */}
      </Head>
      {props.children}
    </>
  );
}
