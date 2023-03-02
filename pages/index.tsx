import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputForm from './components/InputForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My-Wallet</title>
        <meta name="description" content="お小遣い用家計簿アプリ" />
        <meta name="viewport" content="width=device-width"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='text-center pt-3 pb-3 mb-3 bg-info text-white'>
        お小遣い用家計簿
      </h1>
      <InputForm />
    </div>
  )
}
