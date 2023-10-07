import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CustomPricingPage from '@/components/menu-item/pricing/customs';

function PricingSea() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOM PRICING</title>
      </Head>
      <CustomPricingPage />
    </>
  );
}

export default withAuthentication(PricingSea);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingCustoms']);
