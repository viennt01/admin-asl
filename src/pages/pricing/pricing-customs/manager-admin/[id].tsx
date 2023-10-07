import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerCustomPricing from '@/components/menu-item/pricing/sea/manager';

function CustomPricingManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | SEA PRICING MANAGER</title>
      </Head>
      <ManagerCustomPricing />
    </>
  );
}

export default withAuthentication(CustomPricingManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingCustom']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
