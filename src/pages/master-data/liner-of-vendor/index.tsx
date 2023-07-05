import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import LinerOfVendorPage from '@/components/liner-of-vendor-page';

function LinerOfVendor() {
  return (
    <>
      <Head>
        <title>ASL | LINER OF VENDOR</title>
      </Head>
      <LinerOfVendorPage />
    </>
  );
}

export default withAuthentication(LinerOfVendor);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'port']);
