import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditSaleActivity from '@/components/menu-item/sale-activity/edit';

function EditSaleActivityPage() {
  return (
    <>
      <Head>
        <title>ASL | EDIT SALE ACTIViTY</title>
      </Head>
      <EditSaleActivity />
    </>
  );
}

export default withAuthentication(EditSaleActivityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'saleActivity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
