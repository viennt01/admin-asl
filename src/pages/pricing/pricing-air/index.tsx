import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import AirPricingPage from '@/components/menu-item/pricing/air';

function PricingAir() {
  return (
    <>
      <Head>
        <title>ASL | AIR PRICING</title>
      </Head>
      <AirPricingPage />
    </>
  );
}

export default withAuthentication(PricingAir);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingAir']);
