import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditStaff from '@/components/staff-page/staff-edit';

function StaffEditPage() {
  return (
    <>
      <Head>
        <title>ASL | STAFF EDIT</title>
      </Head>
      <EditStaff />
    </>
  );
}

export default withAuthentication(StaffEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'staff']);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
