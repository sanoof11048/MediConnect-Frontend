import { useEffect } from 'react'
import About from './About'
import Career from './Career'
import Contact from './Contact'
import Footer from './Footer'
import { GoToTop, ScrollProgress } from './GoToTop'
import Hero from './Hero'
import Navbar from './Navbar'
import Service from './Service'
import axiosAuth from '../api/axiosAuth'

function Home() {
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axiosAuth.get("/User/all-user");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, []);

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