import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTruckingQuotation from '@/components/menu-item/quotation/trucking/edit';

function TruckingQuotationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING QUOTATION EDIT</title>
      </Head>
      <EditTruckingQuotation />
    </>
  );
}

export default withAuthentication(TruckingQuotationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'truckingQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
