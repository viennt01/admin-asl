import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import BookingPage from '@/components/booking-page';

function Container() {
  return (
    <>
      <Head>
        <title>GLS | BOOKING</title>
      </Head>
      <BookingPage />
    </>
  );
}

export default withAuthentication(Container);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'booking']);
