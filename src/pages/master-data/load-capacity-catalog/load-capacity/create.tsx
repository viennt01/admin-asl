import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateLocation from '@/components/menu-item/master-data/location-catalog/location/create';

function CreateLocationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE LOAD CAPACITY</title>
      </Head>
      <CreateLocation />
    </>
  );
}

export default withAuthentication(CreateLocationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'location']);
