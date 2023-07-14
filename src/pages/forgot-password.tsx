import { PageWithNoLayout } from '@/layout/no-layout';
import ForgotPasswordPage from '@/components/forgot-password-page/forgot-password-page';

function ForgotPassword() {
  return <ForgotPasswordPage />;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ForgotPassword.Layout = PageWithNoLayout;

export default ForgotPassword;
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'forgot-password']);
