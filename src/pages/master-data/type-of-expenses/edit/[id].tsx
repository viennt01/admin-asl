import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditExpensesType from '@/components/type-of-expenses-page/type-of-expenses-edit';

function TypeOfExpensesEditPage() {
  return (
    <>
      <Head>
        <title>GLS | EXPENSES TYPE EDIT</title>
      </Head>
      <EditExpensesType />
    </>
  );
}

export default withAuthentication(TypeOfExpensesEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'type-of-expenses']);
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
