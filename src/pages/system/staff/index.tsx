import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import StaffPage from '@/components/menu-item/system/staff';

function Staff() {
  return (
    <>
      <Head>
        <title>ASL | STAFF</title>
      </Head>
      <StaffPage />
    </>
  );
}

export default withAuthentication(Staff);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'staff']);
