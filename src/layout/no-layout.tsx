import Head from 'next/head';
interface Props {
  children: React.ReactNode;
}
export function PageWithNoLayout(props: Props) {
  return (
    <>
      <Head>
        <link rel="favicon" href="/images/gls-logo.ico" />
        <link rel="shortcut icon" href="/images/gls-logo.ico" />
      </Head>
      {props.children}
    </>
  );
}
