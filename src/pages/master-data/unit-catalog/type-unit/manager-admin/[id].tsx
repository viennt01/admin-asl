import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTypeUnit from '@/components/menu-item/master-data/unit-catalog/type-unit/manager';

function UnitManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | UNIT TYPE MANAGER</title>
      </Head>
      <ManagerTypeUnit />
    </>
  );
}

export default withAuthentication(UnitManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfUnit']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
