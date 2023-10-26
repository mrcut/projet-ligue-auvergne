import { useState } from 'react'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainRoutes from './routes/MainRoutes';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Header/>
          <MainRoutes/>
         <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
