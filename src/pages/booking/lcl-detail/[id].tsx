import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import LclOceanFreightDetail from '@/components/menu-item/booking/lcl-sea-detail';

function BookingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BOOKING DETAIL LCL</title>
      </Head>
      <LclOceanFreightDetail />
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
