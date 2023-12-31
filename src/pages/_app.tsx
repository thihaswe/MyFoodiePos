import Layout from "@/components/Layout";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import TopBarProgress from "react-topbar-progress-indicator";
import { store } from "@/store";
import { useState } from "react";
import { Router } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
