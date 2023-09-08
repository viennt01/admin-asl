import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateLocationType from '@/components/type-of-location-page/create';

function CreateCurrencyPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE LOCATION TYPE</title>
      </Head>
      <CreateLocationType />
    </>
  );
}

export default withAuthentication(CreateCurrencyPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLocation']);
