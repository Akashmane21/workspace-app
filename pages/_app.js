import Layout from '../Comps/Layout'
import  '../styles/globals.scss'
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();


function MyApp({ Component, pageProps }) {
  return (
    <>
     
      
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
         
      </Head>

    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp
