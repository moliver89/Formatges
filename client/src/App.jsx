import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// Importamos los estilos
import '../index.css';
// Importamos los componentes
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <>
      <Header />
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 4000,
        }}
      />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
