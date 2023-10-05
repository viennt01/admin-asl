import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditFeeGroup from '@/components/menu-item/master-data/fee-catalog/fee-group/edit';

function FeeGroupEditPage() {
  return (
    <>
      <Head>
        <title>ASL | FEE GROUP EDIT</title>
      </Head>
      <EditFeeGroup />
    </>
  );
}

export default withAuthentication(FeeGroupEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'feeGroup']);
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
