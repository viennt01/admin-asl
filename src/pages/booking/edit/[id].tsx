import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
// import EditBooking from '@/components/menu-item/booking/booking-edit';
function BookingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BOOKING EDIT</title>
      </Head>
      {/* <EditBooking /> */}
    </>
  );
}

export default withAuthentication(BookingEditPage);
