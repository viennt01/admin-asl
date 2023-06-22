import Head from 'next/head';
interface Props {
  children: React.ReactNode;
}
export function PageWithNoLayout(props: Props) {
  return (
    <>
      <Head>
        <link rel="favicon" href="/images/asl-logo.png" />
        <link rel="shortcut icon" href="/images/asl-logo.png" />
      </Head>
      {props.children}
    </>
  );
}
