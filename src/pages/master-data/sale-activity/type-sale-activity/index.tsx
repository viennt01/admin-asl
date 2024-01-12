import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeSaleActivity from '@/components/menu-item/master-data/sale-activity/type-sale-activity';

function TypeOfDeclarationPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE SALE ACTIVITY</title>
      </Head>
      <TypeSaleActivity />
    </>
  );
}

export default withAuthentication(TypeOfDeclarationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfSaleActivity']);
