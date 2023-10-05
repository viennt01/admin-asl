import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateLocationType from '@/components/menu-item/master-data/location-catalog/type-of-location/create';

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
