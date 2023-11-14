import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateCustomPricing from '@/components/menu-item/pricing/custom/create';

function CreateCustomPricingPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE CUSTOM PRICING</title>
      </Head>
      <CreateCustomPricing />
    </>
  );
}

export default withAuthentication(CreateCustomPricingPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingCustoms']);
