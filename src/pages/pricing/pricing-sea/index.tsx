import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import PricingSeaPage from '@/components/pricing-sea-page';

function PricingSea() {
  return (
    <>
      <Head>
        <title>ASL | SEA PRICING</title>
      </Head>
      <PricingSeaPage />
    </>
  );
}

export default withAuthentication(PricingSea);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingSea']);
