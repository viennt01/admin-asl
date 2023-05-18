import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCalculationUnit from '@/components/calculation-unit-page/calculation-unit-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Calculation Unit Edit</title>
      </Head>
      <EditCalculationUnit />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
