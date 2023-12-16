import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import LclOceanFreightDetail from '@/components/lcl-sea-deatil';
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
