import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import SupplierPage from '@/components/liner-vendor-supplier-page';

function Supplier() {
  return (
    <>
      <Head>
        <title>ASL | SUPPLIER</title>
      </Head>
      <SupplierPage />
    </>
  );
}

export default withAuthentication(Supplier);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'supplier']);
