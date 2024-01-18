import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import LtlTruckDetail from '@/components/menu-item/booking/ltl-truck-detail';

function BookingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BOOKING DETAIL LTL</title>
      </Head>
      <LtlTruckDetail />
    </>
  );
}

export default withAuthentication(BookingEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'booking']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
