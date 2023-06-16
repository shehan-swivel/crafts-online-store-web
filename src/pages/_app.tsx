import ConfirmationDialog from "@/components/organisms/ConfirmationDialog";
import Snackbar from "@/components/organisms/Snackbar";
import createEmotionCache from "@/config/createEmotionCache";
import theme from "@/config/theme";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConfirmProvider } from "@/contexts/ConfirmContext";
import { wrapper } from "@/store";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

import "@/styles/globals.css";
import "nprogress/nprogress.css";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const inter = Inter({ subsets: ["latin"] });
NProgress.configure({ showSpinner: false });
const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, ...otherProps }: Props) {
  const { store, props } = wrapper.useWrappedStore(otherProps);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  // Start to show top loading bar
  const handleRouteStart = () => NProgress.start();

  // Finish and hide top loading bar
  const handleRouteDone = () => NProgress.done();

  useEffect(() => {
    // Subscribe route change events when mount the app
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Unsubscribe route change events when unmount the app
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Crafts Online Store" />
        <link rel="icon" href="/favicon.ico" />
        <title>Craftify.lk</title>
      </Head>

      <main className={inter.className}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Provider store={store}>
              <ConfirmProvider>
                {getLayout(<Component {...pageProps} />)}

                <ConfirmationDialog />
                <Snackbar />
                <CssBaseline />
              </ConfirmProvider>
            </Provider>
          </AuthProvider>
        </ThemeProvider>
      </main>
    </CacheProvider>
  );
}
