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
