import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeOfCustomsPage from '@/components/type-of-customs-page';

function TypeOfCustoms() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF CUSTOMS</title>
      </Head>
      <TypeOfCustomsPage />
    </>
  );
}

export default withAuthentication(TypeOfCustoms);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfCustoms']);
