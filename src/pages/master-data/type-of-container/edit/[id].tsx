import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeOfContainer from '@/components/type-of-container-page/type-of-container-edit';

function TypeOfContainerEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF CONTAINER EDIT</title>
      </Head>
      <EditTypeOfContainer />
    </>
  );
}

export default withAuthentication(TypeOfContainerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfContainer']);
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
