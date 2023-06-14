import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCustomer from '@/components/customer-page/customer-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION EDIT</title>
      </Head>
      <EditCustomer />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customer']);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
