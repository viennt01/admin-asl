import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPricingTrucking from '@/components/pricing-trucking-page/pricing-trucking-edit';

function PricingTruckingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING PRICING EDIT</title>
      </Head>
      <EditPricingTrucking />
    </>
  );
}

export default withAuthentication(PricingTruckingEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingTrucking']);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
