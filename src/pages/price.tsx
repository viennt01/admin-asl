import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import PricePage from '@/components/price-page';

function Price() {
  return (
    <>
      <Head>
        <title>GLS | PRICE</title>
      </Head>
      <PricePage />
    </>
  );
}

export default withAuthentication(Price);
