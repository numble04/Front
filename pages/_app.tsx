import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Container } from 'components/common/Container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Container>
        <Component {...pageProps} />
      </Container>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
