import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import LineChart from '../components/LineChart'
import Footer from '../components/Footer'
import { useWeb3 } from '@3rdweb/hooks'

export default function Home() {
  const { address, chainId } = useWeb3()
  return (
    <>
      <Header />
      <Hero />
      <LineChart />
      <Footer />
    </>
  )
}
