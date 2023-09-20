import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import SeaPricingPage from '@/components/sea-pricing-page';

function PricingSea() {
  return (
    <>
      <Head>
        <title>ASL | SEA PRICING</title>
      </Head>
      <SeaPricingPage />
    </>
  );
}

export default withAuthentication(PricingSea);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingSea']);
