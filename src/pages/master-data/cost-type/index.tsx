import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CostTypePage from '@/components/cost-type-page';

function CostType() {
  return (
    <>
      <Head>
        <title>GLS | COST</title>
      </Head>
      <CostTypePage />
    </>
  );
}

export default withAuthentication(CostType);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfExpenses']);
