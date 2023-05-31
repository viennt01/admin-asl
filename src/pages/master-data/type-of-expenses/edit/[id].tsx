import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditExpensesType from '@/components/type-of-expenses-page/type-of-expenses-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Expenses Type Edit</title>
      </Head>
      <EditExpensesType />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
// import { getStatic } from '@/lib/getStaticProps';
// export const getStaticProps = getStatic(['common', 'type-of-expenses']);
// export async function getStaticPaths() {
//   return {
//     paths: [`/master-data/type-of-expenses/edit/[id]`, { params: { id: '0' } }],
//     fallback: false,
//   };
// }
