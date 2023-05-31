import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditBooking from '@/components/booking-page/booking-edit';

function BookingEditPage() {
  return (
    <>
      <Head>
        <title>GLS | BOOKING Edit</title>
      </Head>
      <EditBooking />
    </>
  );
}

export default withAuthentication(BookingEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'booking']);
export async function getStaticPaths() {
  return {
    paths: [`/booking/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
