import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerPartner from '@/components/menu-item/partner/manager';

function ManagerPartnerPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER PARTNER</title>
      </Head>
      <ManagerPartner />
    </>
  );
}

export default withAuthentication(ManagerPartnerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'partner',
  'pricingAir',
  'pricingSea',
  'pricingCustoms',
  'pricingTrucking',
  'booking',
]);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
