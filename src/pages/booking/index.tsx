import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import BookingPage from '@/components/booking-page';

function Booking() {
  return (
    <>
      <Head>
        <title>GLS | BOOKING</title>
      </Head>
      <BookingPage />
    </>
  );
}

export default withAuthentication(Booking);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'booking']);
