import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditStaff from '@/components/staff-page/staff-edit';

function StaffEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION Edit</title>
      </Head>
      <EditStaff />
    </>
  );
}

export default withAuthentication(StaffEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'staff']);
export async function getStaticPaths() {
  return {
    paths: [`/system/staff/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
