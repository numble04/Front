import { ReactElement } from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): ReactElement {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8"></meta>
          {/* HINT : 구글 서치 콘솔 인증 */}
          <meta
            name="google-site-verification"
            content="yS7Tf3Ts1jVVO13YUivdt_dRnNkRTAYMDvPjYTt_GQM"
          />
          {/* HINT : 네이버 서치 어드바이저 인증 */}
          <meta
            name="naver-site-verification"
            content="29f9cc90f9518b0d55f032a653b20897901b493b"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}
