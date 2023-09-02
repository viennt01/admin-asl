import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreatePricingSea from '@/components/pricing-sea-page/create-pricing-sea';

function CreateSeaPricingPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE SEA PRICING</title>
      </Head>
      <CreatePricingSea />
    </>
  );
}

export default withAuthentication(CreateSeaPricingPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingSea']);
