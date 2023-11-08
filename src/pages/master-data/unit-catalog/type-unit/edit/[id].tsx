import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeUnit from '@/components/menu-item/master-data/unit-catalog/type-unit/edit';

function UnitEditPage() {
  return (
    <>
      <Head>
        <title>ASL | UNIT TYPE EDIT</title>
      </Head>
      <EditTypeUnit />
    </>
  );
}

export default withAuthentication(UnitEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfUnit']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
