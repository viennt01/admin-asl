import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CustomPricing from '@/components/menu-item/pricing/custom';

function PricingCustomPage() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOM PRICING</title>
      </Head>
      <CustomPricing />
    </>
  );
}

export default withAuthentication(PricingCustomPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingCustoms']);
