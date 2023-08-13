import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CompanyPage from '@/components/company-page';

function Company() {
  return (
    <>
      <Head>
        <title>ASL | COMPANY</title>
      </Head>
      <CompanyPage />
    </>
  );
}

export default withAuthentication(Company);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'company']);
