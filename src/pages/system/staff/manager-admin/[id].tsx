import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerStaff from '@/components/menu-item/system/staff/manager';

function ManagerStaffPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER STAFF</title>
      </Head>
      <ManagerStaff />
    </>
  );
}

export default withAuthentication(ManagerStaffPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'staff']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
