import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateStaff from '@/components/menu-item/system/staff/create';

function CreateStaffPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE STAFF</title>
      </Head>
      <CreateStaff />
    </>
  );
}

export default withAuthentication(CreateStaffPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'staff']);
