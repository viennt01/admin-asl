import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CommodityEditPage from '@/components/commodity-page/edit';

function CommodityEdit() {
  return (
    <>
      <Head>
        <title>ASL | COMMODITY</title>
      </Head>
      <CommodityEditPage />
    </>
  );
}

export default withAuthentication(CommodityEdit);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'commodity']);
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