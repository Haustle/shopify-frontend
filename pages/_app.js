import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Layout>
      <Head>
        <title>Shoppies Challenge ← Tyrus Miles</title>
        <link rel="shortcut icon" type="image/png" href="https://cdn.shopify.com/static/shopify-favicon.png"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp
