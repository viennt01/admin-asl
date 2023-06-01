import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPermission from '@/components/permission-page/permission-edit';

function PermissionEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION Edit</title>
      </Head>
      <EditPermission />
    </>
  );
}

export default withAuthentication(PermissionEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'permission']);
export async function getStaticPaths() {
  return {
    paths: [`/system/permission/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
