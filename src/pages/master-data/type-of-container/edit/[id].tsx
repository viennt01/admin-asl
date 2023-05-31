import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeOfContainer from '@/components/type-of-container-page/type-of-container-edit';

function TypeOfContainerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Type Of Container Edit</title>
      </Head>
      <EditTypeOfContainer />
    </>
  );
}

export default withAuthentication(TypeOfContainerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'type-of-container']);
export async function getStaticPaths() {
  return {
    paths: [
      `/master-data/type-of-container/edit/[id]`,
      { params: { id: '0' } },
    ],
    fallback: false,
  };
}
