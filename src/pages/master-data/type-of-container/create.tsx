import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTypeOfContainer from '@/components/type-of-container-page/create';

function CreateTypeOfContainerPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE TYPE OF CONTAINER</title>
      </Head>
      <CreateTypeOfContainer />
    </>
  );
}

export default withAuthentication(CreateTypeOfContainerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfContainer']);
