import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditBooking from '@/components/booking-page/booking-edit';

function BookingEditPage() {
  return (
    <>
      <Head>
        <title>GLS | BOOKING EDIT</title>
      </Head>
      <EditBooking />
    </>
  );
}

export default withAuthentication(BookingEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'booking',
  'port',
  'container',
]);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
