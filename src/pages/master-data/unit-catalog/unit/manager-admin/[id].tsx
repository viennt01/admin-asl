import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerUnit from '@/components/menu-item/master-data/unit-catalog/unit/manager';

function UnitManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | UNIT MANAGER</title>
      </Head>
      <ManagerUnit />
    </>
  );
}

export default withAuthentication(UnitManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'unit']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
