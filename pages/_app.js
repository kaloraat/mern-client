import { ThemeProvider } from "../context/theme";
import { AuthProvider } from "../context/auth";
import { PostProvider } from "../context/post";
import { MediaProvider } from "../context/media";
import TopNav from "../components/nav/TopNav";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostProvider>
          <MediaProvider>
            <Head>
              <link rel="stylesheet" href="/css/styles.css" />

              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
                rel="stylesheet"
              />
            </Head>
            <TopNav />
            <Component {...pageProps} />
            <Toaster />
          </MediaProvider>
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
