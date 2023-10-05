import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateBank from '@/components/menu-item/master-data/accounting/bank/create';

function CreateCurrencyPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE BANK</title>
      </Head>
      <CreateBank />
    </>
  );
}

export default withAuthentication(CreateCurrencyPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'bank']);
