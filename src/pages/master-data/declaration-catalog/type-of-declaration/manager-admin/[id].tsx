import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTypeDeclaration from '@/components/menu-item/master-data/declaration-catalog/type-declaration/manager';

function DeclarationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER DECLARATION TYPE</title>
      </Head>
      <ManagerTypeDeclaration />
    </>
  );
}

export default withAuthentication(DeclarationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfDeclaration']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
