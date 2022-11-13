import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Container } from 'components/templetes/Container';
import { QueryClient, QueryClientProvider } from 'react-query';

declare global {
  interface Window {
    kakao: any;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
