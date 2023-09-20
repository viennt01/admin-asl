import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateSeaPricing from '@/components/sea-pricing-page/create';

function CreateSeaPricingPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE SEA PRICING</title>
      </Head>
      <CreateSeaPricing />
    </>
  );
}

export default withAuthentication(CreateSeaPricingPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingSea']);
