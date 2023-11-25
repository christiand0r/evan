import '@/app/globals.css'
//import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`body boby-evanhub`}>
        <Header />
        <main className='main-content'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

