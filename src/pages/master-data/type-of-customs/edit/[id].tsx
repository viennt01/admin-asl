import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeOfCustoms from '@/components/type-of-customs-page/type-of-customs-edit';

function TypeOfCustomsEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF CUSTOMS EDIT</title>
      </Head>
      <EditTypeOfCustoms />
    </>
  );
}

export default withAuthentication(TypeOfCustomsEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfCustoms']);
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
