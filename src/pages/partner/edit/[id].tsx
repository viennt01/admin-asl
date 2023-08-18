import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPartner from '@/components/partner-page/partner-edit';

function PartnerEditPage() {
  return (
    <>
      <Head>
        <title>ASL | PARTNER EDIT</title>
      </Head>
      <EditPartner />
    </>
  );
}

export default withAuthentication(PartnerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'partner',
  'contactInfo',
  'booking',
  'invoice',
]);
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
