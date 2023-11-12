import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTypeDeclaration from '@/components/menu-item/master-data/declaration-catalog/type-declaration/create';

function CreateDeclarationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE DECLARATION TYPE</title>
      </Head>
      <CreateTypeDeclaration />
    </>
  );
}

export default withAuthentication(CreateDeclarationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfDeclaration']);
