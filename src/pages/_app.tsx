import ConfirmationDialog from "@/components/organisms/ConfirmationDialog";
import createEmotionCache from "@/config/createEmotionCache";
import theme from "@/config/theme";
import { ConfirmProvider } from "@/contexts/ConfirmContext";
import { wrapper } from "@/store";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, ...otherProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(otherProps);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Crafts Online Store" />
        <link rel="icon" href="/favicon.ico" />
        <title>Crafts Online Store</title>
      </Head>

      <SessionProvider session={pageProps.session}>
        <main className={inter.className}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
              <ConfirmProvider>
                {getLayout(<Component {...pageProps} />)}

                <ConfirmationDialog />
              </ConfirmProvider>
            </Provider>
          </ThemeProvider>
        </main>
      </SessionProvider>
    </CacheProvider>
  );
}
