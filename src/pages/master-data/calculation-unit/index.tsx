import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CalculationUnitPage from '@/components/calculation-unit-page';

function CalculationUnit() {
  return (
    <>
      <Head>
        <title>GLS | CALCULATION UNIT</title>
      </Head>
      <CalculationUnitPage />
    </>
  );
}

export default withAuthentication(CalculationUnit);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'unitOfMeasurement']);
