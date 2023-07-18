import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditSupplier from '@/components/liner-vendor-supplier-page/liner-vendor-supplier-edit';

function SupplierEditPage() {
  return (
    <>
      <Head>
        <title>ASL | LINER/VENDOR/SUPPLIER EDIT</title>
      </Head>
      <EditSupplier />
    </>
  );
}

export default withAuthentication(SupplierEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'supplier',
  'contactInfo',
  'booking',
  'invoice',
]);
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
