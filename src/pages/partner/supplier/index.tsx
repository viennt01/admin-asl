import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import SupplierPage from '@/components/supplier-page';

function Supplier() {
  return (
    <>
      <Head>
        <title>GLS | SUPPLIER</title>
      </Head>
      <SupplierPage />
    </>
  );
}

export default withAuthentication(Supplier);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'supplier']);
