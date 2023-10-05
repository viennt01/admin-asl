import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditBank from '@/components/bank/edit';

function BankEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BANK EDIT</title>
      </Head>
      <EditBank />
    </>
  );
}

export default withAuthentication(BankEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'bank']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
