import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import PartnerPage from '@/components/partner-page';

function Partner() {
  return (
    <>
      <Head>
        <title>ASL | PARTNER</title>
      </Head>
      <PartnerPage />
    </>
  );
}

export default withAuthentication(Partner);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'partner']);
