import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditBooking from '@/components/booking-page/booking-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | BOOKING Edit</title>
      </Head>
      <EditBooking />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
