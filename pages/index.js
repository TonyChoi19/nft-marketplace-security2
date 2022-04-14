import Header from '../components/Header'
import Hero from '../components/Hero'
import LineChart from '../components/LineChart'
import Footer from '../components/Footer'
import toast, { Toaster } from 'react-hot-toast'
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LineChart />
      <Footer />
    </>
  )
}
