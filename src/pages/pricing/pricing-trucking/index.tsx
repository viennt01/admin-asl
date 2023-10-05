import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import PricingTruckingPage from '@/components/menu-item/pricing/trucking';

function PricingTrucking() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING PRICING</title>
      </Head>
      <PricingTruckingPage />
    </>
  );
}

export default withAuthentication(PricingTrucking);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingTrucking']);
