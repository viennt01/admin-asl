import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerCustomPricing from '@/components/menu-item/pricing/custom/manager';

function CustomPricingManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER CUSTOM PRICING</title>
      </Head>
      <ManagerCustomPricing />
    </>
  );
}

export default withAuthentication(CustomPricingManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingCustoms']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
