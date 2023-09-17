import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeOfContainer from '@/components/type-of-container-page/edit';

function TypeOfContainerEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF CONTAINER EDIT</title>
      </Head>
      <EditTypeOfContainer />
    </>
  );
}

export default withAuthentication(TypeOfContainerEditPage);
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
