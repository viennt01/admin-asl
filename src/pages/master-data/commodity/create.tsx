import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CommodityPage from '@/components/commodity-page/create';

function CreateUnitPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE COMMODITY</title>
      </Head>
      <CommodityPage />
    </>
  );
}

export default withAuthentication(CreateUnitPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'commodity']);
