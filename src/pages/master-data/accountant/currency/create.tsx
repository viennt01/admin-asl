import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateCurrency from '@/components/menu-item/master-data/accounting/currency/create';

function CreateCurrencyPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE CURRENCY</title>
      </Head>
      <CreateCurrency />
    </>
  );
}

export default withAuthentication(CreateCurrencyPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'currency']);
