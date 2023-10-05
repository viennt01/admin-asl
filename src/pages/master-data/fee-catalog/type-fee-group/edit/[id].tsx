import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeFeeGroup from '@/components/menu-item/master-data/fee-catalog/type-fee-group/edit';

function TypeFeeGroupEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF FEE GROUP EDIT</title>
      </Head>
      <EditTypeFeeGroup />
    </>
  );
}

export default withAuthentication(TypeFeeGroupEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeFeeGroup']);
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
