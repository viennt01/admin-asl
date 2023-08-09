import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import PricingAirPage from '@/components/pricing-air-page';

function PricingAir() {
  return (
    <>
      <Head>
        <title>ASL | AIR PRICING</title>
      </Head>
      <PricingAirPage />
    </>
  );
}

export default withAuthentication(PricingAir);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingAir']);
