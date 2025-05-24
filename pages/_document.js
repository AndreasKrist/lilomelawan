import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Option 1: Cinzel (Roman/Medieval capitals) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cinzel:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        
        {/* Alternative Option 2: Uncial Antiqua (Medieval manuscript style)
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Uncial+Antiqua&display=swap"
          rel="stylesheet"
        />
        */}

        {/* Alternative Option 3: IM Fell (Historical typeface)
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IM+Fell+DW+Pica:ital@0;1&display=swap"
          rel="stylesheet"
        />
        */}

        {/* Alternative Option 4: MedievalSharp (Direct medieval theme)
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=MedievalSharp&display=swap"
          rel="stylesheet"
        />
        */}

        {/* Alternative Option 5: Almendra (Medieval manuscript)
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Almendra:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        */}

        <meta name="description" content="A modern, minimalist article-focused website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}