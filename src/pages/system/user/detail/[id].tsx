import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import DetailUser from '@/components/menu-item/system/user/detail';

function UserDetail() {
  return (
    <>
      <Head>
        <title>ASL | USER DETAIL</title>
      </Head>
      <DetailUser />
    </>
  );
}

export default withAuthentication(UserDetail);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'user']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
