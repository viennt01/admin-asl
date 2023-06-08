import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import DebtorPage from '@/components/debtor-page';

function Debtor() {
  return (
    <>
      <Head>
        <title>GLS | DEBTOR</title>
      </Head>
      <DebtorPage />
    </>
  );
}

export default withAuthentication(Debtor);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'debtor']);
