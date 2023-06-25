import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditQuotation from '@/components/quotation-page/quotation-edit';

function QuotationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | QUOTATION EDIT</title>
      </Head>
      <EditQuotation />
    </>
  );
}

export default withAuthentication(QuotationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'quotation']);
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
