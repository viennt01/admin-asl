import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTruckingPricing from '@/components/menu-item/pricing/trucking/create';

function CreateTruckingPricingPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE TRUCKING PRICING</title>
      </Head>
      <CreateTruckingPricing />
    </>
  );
}

export default withAuthentication(CreateTruckingPricingPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingTrucking']);
