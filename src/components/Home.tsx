import About from './About'
import Career from './Career'
import Contact from './Contact'
import Footer from './Footer'
import { GoToTop, ScrollProgress } from './GoToTop'
import Hero from './Hero'
import Navbar from './Navbar'
import Service from './Service'

function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <Service/>
    <Career/>
    <Contact/>
    <Footer/>
    <GoToTop/>
    <ScrollProgress/>
    </>
  )
}

export default Home