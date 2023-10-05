import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateAirPricing from '@/components/menu-item/pricing/air/create';

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
