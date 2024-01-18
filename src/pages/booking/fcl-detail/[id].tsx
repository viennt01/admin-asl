import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import FclOceanFreightDetail from '@/components/menu-item/booking/fcl-sea-detail';

function BookingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BOOKING DETAIL FCL</title>
      </Head>
      <FclOceanFreightDetail />
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
