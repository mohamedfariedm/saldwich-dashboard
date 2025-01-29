import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import Provider from './Provider';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
// import { inter, lexendDeca } from '@/app/fonts';
import cn from '@/utils/class-names';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import "@fontsource/lexend-deca"; // Defaults to weight 400
import "@fontsource/lexend-deca/400.css"; // Specify weight
// import "@fontsource/lexend-deca/400-italic.css"; // Specify weight and style
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css"; // Specify weight
// import "@fontsource/inter/400-italic.css"; // Specify weight and style
// import { getDictionary } from './dictionaries'

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});
// styles
import '@/app/globals.css';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string;}
}) {
  const session = await getServerSession(authOptions);
  // const dict = await getDictionary(locale)
  // console.log('main Layout : ', locale, dict)

  return (
    <html

      lang={locale}
      dir={dir(locale)}
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <head>
      <link
  rel="stylesheet"
  href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
/>
      </head>
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        // className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
        dir={dir(locale)}
      >
        
          <AuthProvider session={session}>
            <ThemeProvider>
              <Provider>
                <NextProgress />
                  {children}
                <Toaster />
                <GlobalDrawer />
                <GlobalModal />
              </Provider>
            </ThemeProvider>
          </AuthProvider>
        
      </body>
    </html>
  );
}
