import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import FclOceanFreightDetail from '@/components/fcl-sea-detail';
function BookingEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BOOKING EDIT</title>
      </Head>
      <FclOceanFreightDetail />
    </>
  );
}

export default withAuthentication(BookingEditPage);
