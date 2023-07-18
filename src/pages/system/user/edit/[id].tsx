import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditUser from '@/components/user-page/user-edit';

function UserEditPage() {
  return (
    <>
      <Head>
        <title>ASL | USER EDIT</title>
      </Head>
      <EditUser />
    </>
  );
}

export default withAuthentication(UserEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'user']);
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
