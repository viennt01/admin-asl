import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeDeclaration from '@/components/menu-item/master-data/declaration-catalog/type-declaration';

function TypeOfDeclarationPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF DECLARATION</title>
      </Head>
      <TypeDeclaration />
    </>
  );
}

export default withAuthentication(TypeOfDeclarationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfDeclaration']);
