import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import FtlTruckDetail from '@/components/menu-item/booking/ftl-truck-detail';

function BookingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BOOKING DETAIL FTL</title>
      </Head>
      <FtlTruckDetail />
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
