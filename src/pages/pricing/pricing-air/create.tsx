import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateAirPricing from '@/components/air-pricing-page/create';

function CreateAirPricingPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE AIR PRICING</title>
      </Head>
      <CreateAirPricing />
    </>
  );
}

export default withAuthentication(CreateAirPricingPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingAir']);
