import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
// import EditSeaQuotation from '@/components/menu-item/quotation/sea/edit';

function SeaQuotationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | SEA QUOTATION EDIT</title>
      </Head>
      {/* <EditSeaQuotation /> */}
    </>
  );
}

export default withAuthentication(SeaQuotationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'seaQuotation', 'partner']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
