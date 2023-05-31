import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditSupplier from '@/components/supplier-page/supplier-edit';

function SupplierEditPage() {
  return (
    <>
      <Head>
        <title>GLS | SUPPLIER Edit</title>
      </Head>
      <EditSupplier />
    </>
  );
}

export default withAuthentication(SupplierEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'supplier']);
export async function getStaticPaths() {
  return {
    paths: [`/parner/supplier/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
