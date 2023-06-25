import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ExpensesTypePage from '@/components/type-of-expenses-page';

function ExpensesType() {
  return (
    <>
      <Head>
        <title>ASL | TYPES OF EXPENSES</title>
      </Head>
      <ExpensesTypePage />
    </>
  );
}

export default withAuthentication(ExpensesType);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfExpenses']);
