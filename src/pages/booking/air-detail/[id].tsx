import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import AirDetail from '@/components/menu-item/booking/air-detail';

function BookingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BOOKING DETAIL AIR</title>
      </Head>
      <AirDetail />
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
