import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditSeaPricing from '@/components/sea-pricing/edit';

function PricingSeaEditPage() {
  return (
    <>
      <Head>
        <title>ASL | SEA PRICING EDIT</title>
      </Head>
      <EditSeaPricing />
    </>
  );
}

export default withAuthentication(PricingSeaEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingSea']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
