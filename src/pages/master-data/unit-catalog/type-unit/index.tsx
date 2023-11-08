import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CalculationTypeUnit from '@/components/menu-item/master-data/unit-catalog/type-unit';

function TypeUnit() {
  return (
    <>
      <Head>
        <title>ASL | TYPE UNIT</title>
      </Head>
      <CalculationTypeUnit />
    </>
  );
}

export default withAuthentication(TypeUnit);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfUnit']);
