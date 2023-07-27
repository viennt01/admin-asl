import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPricingSea from '@/components/pricing-sea-page/pricing-sea-edit';

function PricingSeaEditPage() {
  return (
    <>
      <Head>
        <title>ASL | SEA PRICING EDIT</title>
      </Head>
      <EditPricingSea />
    </>
  );
}

export default withAuthentication(PricingSeaEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'pricingSea']);
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
