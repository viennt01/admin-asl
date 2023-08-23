import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import RequestForApprovalPage from '@/components/request-for-approval-page';

function RequestForApproval() {
  return (
    <>
      <Head>
        <title>ASL | REQUEST FOR APPROVAL</title>
      </Head>
      <RequestForApprovalPage />
    </>
  );
}

export default withAuthentication(RequestForApproval);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'requestForApproval']);
