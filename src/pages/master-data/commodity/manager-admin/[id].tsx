import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CommodityPage from '@/components/commodity-page/manager';

function Commodity() {
  return (
    <>
      <Head>
        <title>ASL | COMMODITY MANAGER</title>
      </Head>
      <CommodityPage />
    </>
  );
}

export default withAuthentication(Commodity);
import { getStatic } from '@/lib/getStaticProps';
import { LANGUAGES } from '@/constant';
export const getStaticProps = getStatic(['common', 'commodity']);
export const getStaticPaths = () => {
  return {
    paths: LANGUAGES.map((locale: string) => {
      return {
        params: { id: '' },
        locale: locale,
      };
    }),
    fallback: true,
  };
};
