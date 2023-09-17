import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTypeOfContainer from '@/components/type-of-container-page/manager';

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
import { LANGUAGES } from '@/constant';
export const getStaticProps = getStatic(['common', 'typeOfContainer']);
export const getStaticPaths = () => {
  return {
    paths: LANGUAGES.map((locale: string) => {
      return {
        params: { id: '' },
        locale: locale,
      };
    }),
    fallback: true,
  };
};
