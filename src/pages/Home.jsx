import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Experience from '../components/Experience.jsx'
import Education from '../components/Education.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
      </main>
      <Footer />
    </div>
  )
}
