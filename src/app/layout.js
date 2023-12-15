import '@/app/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function RootLayout({ children}) {
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