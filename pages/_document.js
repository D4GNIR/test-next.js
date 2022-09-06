import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

export default function MonDocument() {
  return (
    <Html lang='fr'>
      <Head>{/* Import un cdn */}</Head>
      <body>
        <Main />
        <NextScript />
        {/* Google Analytics */}
        {/* Partage */}
        {/* Pixel */}
        {/* Chat */}
      </body>
    </Html>
  );
}
