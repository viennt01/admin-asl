import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import UserPage from '@/components/user-page';

function User() {
  return (
    <>
      <Head>
        <title>ASL | USER</title>
      </Head>
      <UserPage />
    </>
  );
}

export default withAuthentication(User);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'user']);
