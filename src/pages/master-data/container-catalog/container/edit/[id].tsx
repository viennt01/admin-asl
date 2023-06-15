import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditContainer from '@/components/container-page/container-edit';

function ContainerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | CONTAINER EDIT</title>
      </Head>
      <EditContainer />
    </>
  );
}

export default withAuthentication(ContainerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'container']);
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
