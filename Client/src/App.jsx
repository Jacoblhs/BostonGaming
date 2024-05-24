import React from 'react'
import Home from './views/Home'
import Header from './components/Header'
import Products from './views/Products'
import DesignYourOwn from './views/DesignYourOwn'
import About from './views/About'
import Contact from './views/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Header></Header>
    <main>
    <Home></Home>
    <Products></Products>
    <DesignYourOwn></DesignYourOwn>
    <About></About>
    <Contact></Contact>
    </main>
    <Footer></Footer>
    </>
  )
}

export default App