import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCostType from '@/components/cost-type-page/cost-type-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Cost Type Edit</title>
      </Head>
      <EditCostType />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
