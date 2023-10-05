import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditAirPricing from '@/components/menu-item/pricing/air/edit';

function PricingSeaEditPage() {
  return (
    <>
      <Head>
        <title>ASL | AIR PRICING EDIT</title>
      </Head>
      <EditAirPricing />
    </>
  );
}

export default withAuthentication(PricingSeaEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingAir']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
