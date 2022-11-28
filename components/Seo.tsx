import Head from 'next/head';

interface ISeoProps {
  title: string;
  description?: string;
  image?: string;
}

const Seo = ({ title, description, image }: ISeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="twitter:app:name:iphone" content="boardker" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {image && <meta name="og:image" content={image} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default Seo;
