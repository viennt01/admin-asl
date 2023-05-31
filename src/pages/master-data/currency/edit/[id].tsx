import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCurrency from '@/components/currency-page/currency-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Currency Edit</title>
      </Head>
      <EditCurrency />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'currency']);
export async function getStaticPaths() {
  return {
    paths: [`/master-data/currency/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
