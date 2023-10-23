import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTruckingPricing from '@/components/menu-item/pricing/trucking/edit';

function PricingTruckingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING PRICING EDIT</title>
      </Head>
      <EditTruckingPricing />
    </>
  );
}

export default withAuthentication(PricingTruckingEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingTrucking']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
