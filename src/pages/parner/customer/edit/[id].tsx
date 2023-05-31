import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCustomer from '@/components/customer-page/customer-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION Edit</title>
      </Head>
      <EditCustomer />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customer']);
export async function getStaticPaths() {
  return {
    paths: [`/parner/customer/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
