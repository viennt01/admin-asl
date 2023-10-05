import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTypeOfContainer from '@/components/menu-item/master-data/type-of-container/manager';

function TypeOfContainerManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF CONTAINER MANAGER</title>
      </Head>
      <ManagerTypeOfContainer />
    </>
  );
}

export default withAuthentication(TypeOfContainerManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfContainer']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
