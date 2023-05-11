import withAuthentication from '@/hook/useAuthentication';
import { PageWithNoLayout } from '@/layout/no-layout';
import L from '@/components/login-page/login-page';

function Login() {
  return <L />;
}

const LoginPage = withAuthentication(Login);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
LoginPage.Layout = PageWithNoLayout;

export default LoginPage;
