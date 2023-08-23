import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeOfLocationPage from '@/components/type-of-location-page';

function TypeOfLocation() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF LOCATION</title>
      </Head>
      <TypeOfLocationPage />
    </>
  );
}

export default withAuthentication(TypeOfLocation);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLocation']);
