import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import Commodity from '@/components/commodity-page/commodity-edit';

function CommodityEditPage() {
  return (
    <>
      <Head>
        <title>ASL | COMMODITY</title>
      </Head>
      <Commodity />
    </>
  );
}

export default withAuthentication(CommodityEditPage);
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
