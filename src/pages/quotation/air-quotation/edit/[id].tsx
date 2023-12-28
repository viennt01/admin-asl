import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditAirQuotation from '@/components/menu-item/quotation/air/edit';

function AirQuotationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | SEA QUOTATION EDIT</title>
      </Head>
      <EditAirQuotation />
    </>
  );
}

export default withAuthentication(AirQuotationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'airQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
