import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import Company from '@/components/company-page/company-edit';

function CompanyPage() {
  return (
    <>
      <Head>
        <title>ASL | COMPANY</title>
      </Head>
      <Company />
    </>
  );
}

export default withAuthentication(CompanyPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'company']);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
