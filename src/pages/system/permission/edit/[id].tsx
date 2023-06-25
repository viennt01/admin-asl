import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPermission from '@/components/permission-page/permission-edit';

function PermissionEditPage() {
  return (
    <>
      <Head>
        <title>ASL | PERMISSION EDIT</title>
      </Head>
      <EditPermission />
    </>
  );
}

export default withAuthentication(PermissionEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'permission']);
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
