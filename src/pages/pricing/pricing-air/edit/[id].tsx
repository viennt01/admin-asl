import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPricingAir from '@/components/pricing-air-page/pricing-air-edit';

function PricingAirEditPage() {
  return (
    <>
      <Head>
        <title>ASL | AIR PRICING EDIT</title>
      </Head>
      <EditPricingAir />
    </>
  );
}

export default withAuthentication(PricingAirEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingAir']);
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
