import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TruckingPricing from '@/components/menu-item/pricing/trucking';

function PricingTruckingPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING PRICING</title>
      </Head>
      <TruckingPricing />
    </>
  );
}

export default withAuthentication(PricingTruckingPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingTrucking']);
