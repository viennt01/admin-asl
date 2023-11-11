import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTruckQuotation from '@/components/menu-item/quotation/trucking/edit';

function TruckingQuotationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING QUOTATION EDIT</title>
      </Head>
      <EditTruckQuotation />
    </>
  );
}

export default withAuthentication(TruckingQuotationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'truckingQuotation',
  'partner',
]);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
