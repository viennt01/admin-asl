import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLocationType from '@/components/type-of-location-page/edit';

function TypeOfLocationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | LOCATION TYPE EDIT</title>
      </Head>
      <EditLocationType />
    </>
  );
}

export default withAuthentication(TypeOfLocationEditPage);
import { getStatic } from '@/lib/getStaticProps';
import { LANGUAGES } from '@/constant';
export const getStaticProps = getStatic(['common', 'typeOfLocation']);
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
