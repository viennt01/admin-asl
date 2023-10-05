import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeOfContainerPage from '@/components/menu-item/master-data/type-of-container';

function TypeOfContainer() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF CONTAINER</title>
      </Head>
      <TypeOfContainerPage />
    </>
  );
}

export default withAuthentication(TypeOfContainer);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfContainer']);
