import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPass, setRepeatedPass] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      if (password !== repeatedPass) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Obtenemos los datos del servidor.
      const res = await fetch(`${VITE_API_URL}/api/users/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Obtenemos el body.
      const body = await res.json();

      if (body.status === 'error') {
        throw new Error(body.message);
      }

      toast.success(body.message);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main>
      <main>
        <form onSubmit={handleRegister}>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='pass'>Contraseña:</label>
          <input
            type='password'
            id='pass'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor='repPass'>Repetir Contraseña:</label>
          <input
            type='password'
            id='repPass'
            required
            value={repeatedPass}
            onChange={(e) => setRepeatedPass(e.target.value)}
          />

          <button>Registrarse</button>
        </form>
      </main>
    </main>
  );
};

export default RegisterPage;
