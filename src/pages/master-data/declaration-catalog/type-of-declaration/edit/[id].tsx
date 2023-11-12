import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeDeclaration from '@/components/menu-item/master-data/declaration-catalog/type-declaration/edit';

function TypeOfDeclarationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | EDIT DECLARATION TYPE </title>
      </Head>
      <EditTypeDeclaration />
    </>
  );
}

export default withAuthentication(TypeOfDeclarationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfDeclaration']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
