import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTruckingPricing from '@/components/menu-item/pricing/trucking/manager';

function TruckingPricingManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING PRICING MANAGER</title>
      </Head>
      <ManagerTruckingPricing />
    </>
  );
}

export default withAuthentication(TruckingPricingManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingTrucking']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
