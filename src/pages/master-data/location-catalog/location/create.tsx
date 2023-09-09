import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateLocation from '@/components/location-page/create';

function CreateLocationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE LOCATION</title>
      </Head>
      <CreateLocation />
    </>
  );
}

export default withAuthentication(CreateLocationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'location']);
