import Hero from '../components/Hero'
import Features from '../components/Features'
import ScrollShowcase from '../components/ScrollShowcase'
import HowItWorks from '../components/HowItWorks'
import Specs from '../components/Specs'
import Waitlist from '../components/Waitlist'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ScrollShowcase />
      <HowItWorks />
      <Specs />
      <Waitlist />
      <Footer />
    </main>
  )
}
