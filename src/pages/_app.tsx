import createEmotionCache from "@/config/createEmotionCache";
import theme from "@/config/theme";
import { wrapper } from "@/store";
import "@/styles/globals.css";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import type { NextComponentType } from "next";
import type {
  AppContext,
  AppInitialProps,
  AppLayoutProps,
  AppProps,
} from "next/app";
import Head from "next/head";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  ...otherProps
}: AppProps): NextComponentType<AppContext, AppInitialProps, AppLayoutProps> {
  const { store, props } = wrapper.useWrappedStore(otherProps);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return getLayout(
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Crafts Online Store" />
        <link rel="icon" href="/favicon.ico" />
        <title>Crafts Online Store</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
