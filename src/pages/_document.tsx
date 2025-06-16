import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* PWA primary color */}
        <meta name='theme-color' content='#34D399' />
        <meta
          name='description'
          content='Your daily calorie tracker and TDEE calculator'
        />
        <meta
          name='keywords'
          content='TDEE, calorie calculator, meal history, health, fitness'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/tdee.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/tdee.svg' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='TDEE Calculator' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-TileColor' content='#1f372e' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#1f372e' />
        <meta name='application-name' content='TDEE Calculator' />
      </Head>
      <title>Tdee Calculator</title>
      <body className='antialiased bg-[#1e3a3d] h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
