
import Head from 'next/head'
import GlobaldataProider from "../Context/Context"

const Layout = ({ children }) => {
  return (
    
    <GlobaldataProider>

   
    <Head>
  <link rel='manifest' href='/manifest.json' />
  <meta charset="utf-8" />
    <link rel="icon" href="icons/icon-512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#014473" />
    <meta name="apple-mobile-web-app-status-bar-style" content="white" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"  />
    
    <meta  name="description" content="Manage you WorkSpace here " />

</Head>   

    <div className="content">
      { children }
    </div>
    
    </GlobaldataProider>
   
  );
}
 
export default Layout;