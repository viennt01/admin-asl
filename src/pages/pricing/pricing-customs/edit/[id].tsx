import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCustomPricing from '@/components/menu-item/pricing/customs/edit';

function PricingCustomEditPage() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOM PRICING EDIT</title>
      </Head>
      <EditCustomPricing />
    </>
  );
}

export default withAuthentication(PricingCustomEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingCustoms', 'fee']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
