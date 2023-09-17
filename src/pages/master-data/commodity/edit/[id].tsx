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
