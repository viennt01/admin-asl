import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import LocationTypePage from '@/components/type-of-location-page';

function LocationType() {
  return (
    <>
      <Head>
        <title>ASL | TYPES OF LOCATION</title>
      </Head>
      <LocationTypePage />
    </>
  );
}

export default withAuthentication(LocationType);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLocation']);
