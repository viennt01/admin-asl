import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TruckingPricingPage from '@/components/menu-item/pricing/trucking';

function TruckingSea() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING PRICING</title>
      </Head>
      <TruckingPricingPage />
    </>
  );
}

export default withAuthentication(TruckingSea);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingTrucking']);
