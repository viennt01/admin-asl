import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerAirPricing from '@/components/air-pricing-page/manager';

function AirPricingManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | AIR PRICING MANAGER</title>
      </Head>
      <ManagerAirPricing />
    </>
  );
}

export default withAuthentication(AirPricingManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingAir']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
