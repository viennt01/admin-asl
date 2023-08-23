import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditRequestForApproval from '@/components/request-for-approval-page/request-for-approval-edit';

function RequestForApprovalEditPage() {
  return (
    <>
      <Head>
        <title>ASL | REQUEST FOR APPROVAL EDIT</title>
      </Head>
      <EditRequestForApproval />
    </>
  );
}

export default withAuthentication(RequestForApprovalEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'requestForApproval']);
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
